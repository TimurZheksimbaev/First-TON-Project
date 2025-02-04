import {
  useTonConnectModal,
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
  CHAIN,
} from "@tonconnect/ui-react";
import { useCallback } from "react";
import { toNano } from "@ton/core";

import { JettonMaster } from "@ton/ton";
import { JettonWallet } from "../contracts/JettonWallet";

import { useTonConnect } from "./useTonConnect";
import { useGenerateId } from "./useGenerateId";
import { TESTNET_USDT_MASTER_ADDRESS, TESTNET_RECEIVER_ADDRESS, MAINNET_RECEIVER_ADDRESS, MAINNET_USDT_MASTER_ADDRESS } from "../constants/addresses";
import { useTonClient } from "./useTonClient";


export const calculateUsdtAmount = (usdCents: number) => BigInt(usdCents * 10000);

    
export const useTonConnectCommands = () => {

  const [connector] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();
  const userAddress = useTonAddress();

  const { sender, walletAddress} = useTonConnect();
  const tonClient = useTonClient()
  const orderId = useGenerateId();

  const jettonMasterAddress = wallet?.account.chain === CHAIN.TESTNET ? TESTNET_USDT_MASTER_ADDRESS: MAINNET_USDT_MASTER_ADDRESS
  const receiverAddress = wallet?.account.chain === CHAIN.TESTNET ? TESTNET_RECEIVER_ADDRESS: MAINNET_RECEIVER_ADDRESS

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

      const jettonMaster = tonClient.open(JettonMaster.create(jettonMasterAddress));
      const usersUsdtAddress = await jettonMaster.getWalletAddress(walletAddress);

      const jettonWallet = tonClient.open(JettonWallet.createFromAddress(usersUsdtAddress));

      await jettonWallet.sendTransfer(sender, {
        fwdAmount: 1n,
        comment: orderId,
        jettonAmount: calculateUsdtAmount(amount * 100),
        toAddress: receiverAddress,
        value: toNano('0.038'),
      });
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
