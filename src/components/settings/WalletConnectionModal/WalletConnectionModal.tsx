import { MODALS } from "../../../constants/modals"
import CentralModal from "../../CentralModal/CentralModal"

import styles from "./WalletConnectionModal.module.scss"
import { useModal } from "../../../hooks/useModal"

import copyIcon from "../../../assets/icons/copy.svg" 
import tickIcon from "../../../assets/icons/tick.svg"
import { useState } from "react"

import { useTonConnectCommands } from "../../../hooks/useTonConnectCommands"

const WalletConnectionModal = () => {
  const {closeModal} = useModal()

  const {
    wallet,
    userAddress,
    connectWallet,
    disconnectWallet,
  } = useTonConnectCommands()

  const [activeButton, setActiveButton] = useState("")

  const handleDisconnectWallet = () => {
    if (userAddress) {
      disconnectWallet()
    }
  }

  const handleCloseModal = () => {  
    closeModal(MODALS.WALLET_CONNECTION)
  }

  const handleWalletConnect = () => {
    setActiveButton("connect")
    connectWallet()
  }

  const handleCopyAddress = async () => {
    setActiveButton("address")
    if (userAddress) {
      await navigator.clipboard.writeText(userAddress);
    }
    setTimeout(() => setActiveButton(""), 250)
  };

  return (
    <CentralModal
      modalId={MODALS.WALLET_CONNECTION}
      title="Кошелек"
      onClose={handleCloseModal}
      headerStyles={styles.titleStyles}
    >


      <div className={styles.wrapper}>
        <div className={styles.walletSection}>
          <div 
          className={`${styles.walletWrapper} ${activeButton === 'connect' ? styles.active: ''}`} 
          onClick={handleWalletConnect}
          >
            <p className={styles.text}>
              {wallet?.device.appName || 'Подключить кошелек'}
            </p>
            <img src={tickIcon} alt="tickIcon" className={styles.icon} />
          </div>

          <div 
          className={`${styles.walletWrapper} ${activeButton === 'address' ? styles.active: ''}`} 
          onClick={handleCopyAddress}
          >
            <p className={styles.text}>
              {userAddress || "Ваш адрес"}
            </p>
            <img src={copyIcon} alt="copyIcon" className={styles.icon} />
          </div>
        </div>

        <div className={styles.walletButtons}>
          <button className={styles.okButton} onClick={handleDisconnectWallet}>
            Отвязать
          </button>

          <button className={styles.disconnectButton} onClick={handleCloseModal}>
            Ок
          </button>
        </div>
      </div>

    </CentralModal>
  )
}

export default WalletConnectionModal

