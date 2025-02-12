import {TonConnectButton} from "@tonconnect/ui-react";
import {fromNano} from 'ton-core';
import {useMainContract} from './hooks/useMainContract';
import {useTonConnect} from './hooks/useTonConnect';
import "./App.css"
// import './style.css'
import './styles.scss'
// import WebApp from "@twa-dev/sdk";
import {useModal} from "./hooks/useModal";
import {MODALS} from "./constants/modals";
import SettingsModal from "./components/settings/SettingsModal/SettingsModal";
import LanguageSelectionModal from "./components/settings/LanguageSelectionModal/LanguageSelectionModal";
import WalletConnectionModal from "./components/settings/WalletConnectionModal/WalletConnectionModal";

import {useWebApp} from "./hooks/useWebapp";
import {} from "./hooks/useMainContract";
import {useSendTransaction} from "./hooks/useSendTransaction";
import {Settings} from "./components/settings/Settings.tsx";
// import {useEffect} from "react";
// import { useMiniApp, useViewport, useSettingsButton } from "@telegram-apps/sdk-react";


const App = () => {
    const {
        contract_address,
        contract_balance,
        counter_value,
        sendIncrement,
        sendDeposit,
        sendWithdraw
    } = useMainContract();

    const {sendUsdtTransaction} = useSendTransaction()

    const {connected} = useTonConnect();

    useWebApp()

    const {openModal} = useModal()
    // const {isOpen} = getModalState(MODALS.SETTINGS)


    // const miniApp = useMiniApp();
    // const viewport = useViewport();
    // const settings = useSettingsButton()

    // useEffect(() => {
    //   // Initial setup for settings button
    //   if (!settings.isVisible) {
    //     settings.show();
    //   }

    //   // Click handler function
    //   const handleSettingsClick = () => {
    //     settings.hide();
    //     openModal(MODALS.SETTINGS);
    //   };

    //   // Add click listener
    //   settings.on('click', handleSettingsClick);

    //   // Cleanup listener when component unmounts
    //   return () => {
    //     settings.off('click', handleSettingsClick);
    //   };
    // }, []); // Empty dependency array since we only want this setup once

    // useEffect(() => {
    //   if (isOpen) {
    //     settings.hide();
    //   } else {
    //     settings.show();
    //   }
    // }, [isOpen]);

    // useEffect(() => {
    //     miniApp.setBgColor('#161C24');
    //     miniApp.setHeaderColor('#161C24');
    //     miniApp.ready();
    // }, []);

    // useEffect(() => {
    //     viewport && viewport.expand();
    // }, []);

    // useEffect(() => {
    //   if (!WebApp.SettingsButton.isVisible) {
    //     WebApp.SettingsButton.show();
    //   }
    // }, [])

    // useEffect(() => {
    //   const handleSettingsClick = () => {
    //     WebApp.SettingsButton.hide();
    //     openModal(MODALS.SETTINGS);
    //     if (!isOpen) {
    //       WebApp.SettingsButton.show();
    //     }
    //   };

    //   WebApp.SettingsButton.onClick(handleSettingsClick);

    //   return () => {
    //     WebApp.SettingsButton.offClick(handleSettingsClick);
    //   };
    // }, [isOpen, openModal]);


    return (
        <div className="app">
            <header className="header">
                <div className="header__settings">
                    <Settings/>
                </div>
                <div className="header__wallet">
                    <TonConnectButton/>
                </div>
            </header>

            <div className="container">
                <div className="content">
                    <div className="card">
                        <h2 className="card-title">Contract Details</h2>

                        <div className="card-content">
                            <div className="detail-item">
                                {/* <b>{WebApp.platform}</b> */}
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
                    <br/>

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
                        </div>
                    )}

                    {!connected && (
                        <div className="connect-message">
                            <p>Connect your wallet to interact with the contract</p>
                        </div>
                    )}
                </div>
                <SettingsModal/>
                <LanguageSelectionModal/>
                <WalletConnectionModal/>
            </div>
        </div>
    );
};

export default App;