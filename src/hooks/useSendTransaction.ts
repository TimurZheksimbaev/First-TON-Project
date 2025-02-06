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



export const calculateUsdtAmount = (usdCents: number) => BigInt(usdCents * 10000);

    
export const useSendTransaction = ():
{
  sendTonTransaction: (amount: number) => void;
  sendUsdtTransaction: (amount: number) => void;
} => {

  const {
    sender,
    tonClient,
    network,
    walletAddress,
    tonConnectUI
  } = useTonConnect()
  const orderId = useGenerateId();

  const jettonMasterAddress = network === CHAIN.TESTNET ? TESTNET_USDT_MASTER_ADDRESS: MAINNET_USDT_MASTER_ADDRESS
  const receiverAddress = network === CHAIN.TESTNET ? TESTNET_RECEIVER_ADDRESS: MAINNET_RECEIVER_ADDRESS

  const sendTonTransaction = async (amount: number) => {
    if (!tonClient || !walletAddress) return 

    try {
      if (!walletAddress) {
        throw new Error("Wallet not connected");
      }

      const transaction = {
        validUntil: Date.now() + 60 * 1000, // 60 seconds
        messages: [
          {
            address: receiverAddress.toString(),
            amount: toNano(amount).toString(),
          },
        ],
      };

      const result = await tonConnectUI.sendTransaction(transaction);
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
    sendTonTransaction,
    sendUsdtTransaction,
  };
};
