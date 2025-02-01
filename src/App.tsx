import { TonConnectButton } from "@tonconnect/ui-react";
import { fromNano } from 'ton-core';
import { useMainContract } from './hooks/useMainContract';
import { useTonConnect } from './hooks/useTonConnect';
import './App.css';
import './style.css'
import WebApp from "@twa-dev/sdk";
import { useModal } from "./hooks/useModal";
import { MODALS } from "./constants/modals";
import SettingsModal from "./components/settings/SettingsModal/SettingsModal";
import LanguageSelectionModal from "./components/settings/LanguageSelectionModal/LanguageSelectionModal";
import WalletConnectionModal from "./components/settings/WalletConnectionModal/WalletConnectionModal";
import { useTonConnectCommands } from "./hooks/useTonConnectCommands";



const App = () => {
  const {
    contract_address,
    contract_balance,
    counter_value,
    sendIncrement,
    sendDeposit,
    sendWithdraw,
    sendTx
  } = useMainContract();

  const {sendTransaction, sendUsdtTransaction} = useTonConnectCommands()

  const { connected } = useTonConnect();
  const { openModal } = useModal()
  
  if (!WebApp.SettingsButton.isVisible) {
    WebApp.SettingsButton.show()
  }


  WebApp.SettingsButton.onClick(() => {
    WebApp.SettingsButton.hide()
    openModal(MODALS.SETTINGS)
  })

  return (
    <div className="container">
      <div className="connect-button">
        <TonConnectButton />
      </div>



      <div className="content">
        <div className="card">
          <h2 className="card-title">Contract Details</h2>
          
          <div className="card-content">
            <div className="detail-item">
              <b>{WebApp.platform}</b>
              <h3>Contract Address</h3>
              <p className="mono">{contract_address?.slice(0, 30) + "..."}</p>
            </div>

            <div className="detail-item">
              <h3>Contract Balance</h3>
              <p className="balance">
                {contract_balance ? `${fromNano(contract_balance)} TON` : "Loading..."}
              </p>
            </div>

            <div className="detail-item counter">
              <h3>Counter Value</h3>
              <p className="counter-value">
                {counter_value ?? "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => openModal(MODALS.SETTINGS)} className="btn btn-blue">
              Show Alert
        </button>
        <br />

        {connected && (
          <div className="button-group">
            <button onClick={() => sendIncrement()} className="btn btn-blue">
              Increment by 5
            </button>

            <button onClick={() => sendDeposit()} className="btn btn-green">
              Deposit 1 TON
            </button>

            <button onClick={() => sendWithdraw()} className="btn btn-purple">
              Request 0.7 TON withdraw

            </button>

            <button onClick={() => sendUsdtTransaction(1.99)} className="btn btn-orange">
              Send 5 USDT to another address
            </button>

            <button onClick={() => sendTransaction("kQDs2zrz8Int5ppwoPVjPr36oNxBA9C42Fyz67Kg1y4qscRh", 1.99)} className="btn btn-orange">
              Get address
            </button>
          </div>
        )}

        {!connected && (
          <div className="connect-message">
            <p>Connect your wallet to interact with the contract</p>
          </div>
        )}
      </div>
      <SettingsModal />
      <LanguageSelectionModal />
      <WalletConnectionModal />
    </div>
  );
};

export default App;