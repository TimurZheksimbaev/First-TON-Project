import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

export const useTonConnectCommands = async () => {
  const [connector] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();
  const userAddress = useTonAddress();

  const connectWallet = () => {
    open();
  }

  const disconnectWallet = () => {
    connector.disconnect();
  };

  const getWalletAddress = () => {
    return userAddress;
  }

  const getWalletName = () => {
    return wallet?.device.appName;
  }

  const sendTransaction = () => {

  }

  return {
    connectWallet: connectWallet,
    disconnectWallet: disconnectWallet,
    getWalletAddress: getWalletAddress,
    getWalletName: getWalletName,
    sendTransaction: sendTransaction,
  }
};
