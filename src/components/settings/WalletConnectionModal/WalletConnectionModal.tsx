import { MODALS } from "../../../constants/modals"
import CentralModal from "../../CentralModal/CentralModal"

import styles from "./WalletConnectionModal.module.scss"
import { useModal } from "../../../hooks/useModal"

import copyIcon from "../../../assets/icons/copy.svg" 
import tickIcon from "../../../assets/icons/tick.svg"

import { useTonConnectModal, useTonAddress, useTonWallet, useTonConnectUI } from "@tonconnect/ui-react"


const WalletConnectionModal = () => {
  const {closeModal} = useModal()

  const [connector] = useTonConnectUI()
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();
  const userAddress = useTonAddress();

  const handleDisconnectWallet = () => {
    connector.disconnect()
  }

  const handleCloseModal = () => {  
    closeModal(MODALS.WALLET_CONNECTION)
  }

  const handleCopyAddress = async () => {
    if (userAddress) {
      await navigator.clipboard.writeText(userAddress);
    }
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
          className={styles.walletWrapper} 
          onClick={open}
          >
            <p className={styles.text}>
              {wallet?.device.appName || 'Default ton wallet'}
            </p>
            <img src={tickIcon} alt="tickIcon" className={styles.icon} />
          </div>

          <div 
          className={styles.walletWrapper}
          onClick={handleCopyAddress}
          >
            <p className={styles.text}>
              {userAddress || '0x11111111111'}
              
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