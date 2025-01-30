import { MODALS } from "../../../constants/modals"
import { useModal } from "../../../hooks/useModal"
import BottomModal from "../../BottomModal/BottomModal"
import styles from "./LanguageSelectionModal.module.scss"
import tick from "../../../assets/icons/tick.svg"
import circle from "../../../assets/icons/circle.svg"
import russiaIcon from "../../../assets/icons/Russia.svg"
import usaIcon from "../../../assets/icons/usa.svg"
import { useState } from "react"

const LanguageSelectionModal = () => {
    const {closeModal} = useModal()
    const [selectedLanguage, setSelectedLanguage] = useState("")

    const handleCloseModal = () => {
        closeModal(MODALS.LANGUAGE_SELECTION)
    }

    const handleSelectLanguage = (language: string) => {
        setSelectedLanguage(language)
    }
  return (
    <BottomModal
     modalId={MODALS.LANGUAGE_SELECTION} 
     title="Язык/Language" 
     titleWrapperStyles={styles.titleStyles} 
     onClose={handleCloseModal}>

        <div className={styles.wrapper}>

            <div className={styles.languageSection}>

                <div 
                className={`${styles.languageWrapper} ${selectedLanguage === 'ru' ? styles.selected : ''}`} 
                onClick={() => handleSelectLanguage('ru')}
                >
                    <div className={`${styles.languageAndIcon} ${selectedLanguage === 'ru' ? styles.selectedText : ''}`}>
                        <div className={styles.countryIconWrapper}>
                            <img className={styles.countryIcon} src={usaIcon} alt="usaIcon" />
                        </div>
                            English language
                    </div>

                    <img 
                        src={selectedLanguage === 'ru' ? tick : circle} 
                        alt={selectedLanguage === 'ru' ? "Selected" : "Not selected"} 
                    />
                </div>


                <div
                 className={`${styles.languageWrapper} ${selectedLanguage === 'en' ? styles.selected : ''}`} 
                 onClick={() => handleSelectLanguage('en')}
                 >
                    <div className={`${styles.languageAndIcon} ${selectedLanguage === 'en' ? styles.selectedText : ''}`}>
                        <div className={styles.countryIconWrapper}>
                            <img className={styles.countryIcon} src={russiaIcon} alt="russiaIcon" />
                        </div>
                        Русский язык
                    </div>

                    <img 
                        src={selectedLanguage === 'en' ? tick : circle} 
                        alt={selectedLanguage === 'en' ? "Selected" : "Not selected"} 
                    />

                </div>
            </div>

            <button className={styles.applyButton} onClick={handleCloseModal}>
                Применить/Apply
            </button>

        </div>
    </BottomModal>
  )
}

export default LanguageSelectionModal