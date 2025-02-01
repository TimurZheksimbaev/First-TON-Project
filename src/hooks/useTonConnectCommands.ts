import {
  useTonConnectModal,
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useCallback } from "react";
import { Address, toNano } from "ton-core";

import { JettonMaster } from "@ton/ton";
import { JettonWallet } from "../contracts/JettonWallet";

import { useTonConnect } from "./useTonConnect";
import { useGenerateId } from "./useGenerateId";
import TonWeb from "tonweb";




const TESTNET_USDT_MASTER_ADDRESS = Address.parse("kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy")
const INVOICE_ADDRESS = Address.parse("0QDs2zrz8Int5ppwoPVjPr36oNxBA9C42Fyz67Kg1y4qsZmk")


export const calculateUsdtAmount = (usdCents: number) => BigInt(usdCents * 10000);


export const useTonConnectCommands = () => {
  const tonWeb = new TonWeb()

  tonWeb.provider.sendBoc()

  const [connector] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();
  const userAddress = useTonAddress();

  const { sender, walletAddress, tonClient } = useTonConnect();
  const orderId = useGenerateId();

  const connectWallet = useCallback(() => {
    if (!userAddress) {
      open();
    }
  }, [open]);

  const disconnectWallet = () => {
    if (userAddress) {
      connector.disconnect();
    }
  };

  const sendTransaction = async (to: string, amount: number) => {
    if (!tonClient || !wallet) return 

    try {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const transaction = {
        validUntil: Date.now() + 60 * 1000, // 60 seconds
        messages: [
          {
            address: to,
            amount: toNano(amount).toString(),
          },
        ],
      };

      const result = await connector.sendTransaction(transaction);
      return result;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };


  const sendUsdtTransaction = useCallback(async (amount: number) => {
    try {
      if (!tonClient || !walletAddress) return;

      const jettonMaster = tonClient.open(JettonMaster.create(TESTNET_USDT_MASTER_ADDRESS));
      const usersUsdtAddress = await jettonMaster.getWalletAddress(walletAddress);
      console.log(usersUsdtAddress.toString())


      // creating and opening jetton wallet instance.
      // First argument (provider) will be automatically substituted in methods, which names starts with 'get' or 'send'
      const jettonWallet = tonClient.open(JettonWallet.createFromAddress(usersUsdtAddress));


      await jettonWallet.sendTransfer(sender, {
        fwdAmount: 1n,
        comment: orderId,
        jettonAmount: calculateUsdtAmount(amount * 100),
        toAddress: INVOICE_ADDRESS,
        value: toNano("0.001"),
      });

      console.log(`See transaction at https://testnet.tonviewer.com/${usersUsdtAddress.toString()}`);
    } catch (error) {
      console.log('Error during transaction check:', error);
    }
  }, [tonClient, walletAddress, sender]);


  return {
    wallet,
    userAddress,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    sendUsdtTransaction,
    isConnected: !!wallet,
  };
};
