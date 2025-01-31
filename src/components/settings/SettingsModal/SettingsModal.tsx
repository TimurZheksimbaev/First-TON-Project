import styles from "./SettingsModal.module.scss"
import BottomModal from "../../BottomModal/BottomModal"
import { MODALS } from "../../../constants/modals"
import { useModal } from "../../../hooks/useModal"
import russiaIcon from "../../../assets/icons/Russia.svg"
import cryptoWalletIcon from "../../../assets/images/Wallet.png"
import ArrowRight from "../../../assets/icons/arrow-right.svg"


const SettingsModal = () => {
    const { closeModal, openModal, } = useModal()

    const handleCloseModal = () => {
        closeModal(MODALS.SETTINGS)
    }

    const handleOpenLanguageSelectionModal = () => {
        openModal(MODALS.LANGUAGE_SELECTION)
        // closeModal(MODALS.SETTINGS)
    }

    const handleOpenWalletConnectionModal = () => {
        openModal(MODALS.WALLET_CONNECTION)
        // closeModal(MODALS.SETTINGS)
    }

    return (
        <BottomModal
            modalId={MODALS.SETTINGS} 
            title="Настройки" 
            onClose={handleCloseModal} 
            titleWrapperStyles={styles.titleStyles}
            >
            <div className={styles.wrapper}>
                <div className={styles.childModalWrapper} onClick={handleOpenLanguageSelectionModal}>
                    <div className={styles.titleAndIcon}>
                        <img className={styles.icon} src={russiaIcon} alt="" />
                        Язык
                    </div>
                    <img className={styles.arrow} src={ArrowRight} alt="" />
                </div>

                <div className={styles.childModalWrapper} onClick={handleOpenWalletConnectionModal}>
                    <div className={styles.titleAndIcon}>
                        <img className={styles.icon} src={cryptoWalletIcon} alt="" />
                        Кошелек
                    </div>
                    <img className={styles.arrow} src={ArrowRight} alt="" />
                </div>


                <button className={styles.OK} onClick={handleCloseModal}>
                    Ок
                </button>
            </div>
        </BottomModal>
    )
}

export default SettingsModal