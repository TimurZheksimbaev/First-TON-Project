import { MODALS } from "../../../constants/modals"
import { useModal } from "../../../hooks/useModal"
import BottomModal from "../../BottomModal/BottomModal"
import styles from "./LanguageSelectionModal.module.scss"
import tick from "../../../assets/icons/tick.svg"
import circle from "../../../assets/icons/circle.svg"
import { useState } from "react"
import usaIcon from "../../../assets/icons/usa.svg"
import russiaIcon from "../../../assets/icons/russia.svg"


const LANGUAGES = [
  {
    code: 'en',
    name: 'English language',
    icon: usaIcon,
  },
  {
    code: 'ru',
    name: 'Русский язык',
    icon: russiaIcon,
  },
];

type LanguageCode = typeof LANGUAGES[number]['code'];

interface LanguageOptionProps {
  language: typeof LANGUAGES[number];
  isSelected: boolean;
  onSelect: (code: LanguageCode) => void;
}

const LanguageOption = ({ language, isSelected, onSelect }: LanguageOptionProps) => (
  <div 
    className={`${styles.languageWrapper} ${isSelected ? styles.selected : ''}`} 
    onClick={() => onSelect(language.code)}
  >
    <div className={`${styles.languageAndIcon} ${isSelected ? styles.selectedText : ''}`}>
      <div className={styles.countryIconWrapper}>
        <img className={styles.countryIcon} src={language.icon} alt={`${language.name} icon`} />
      </div>
      {language.name}
    </div>
    <img 
      src={isSelected ? tick : circle} 
      alt={isSelected ? "Selected" : "Not selected"} 
    />
  </div>
);

const LanguageSelectionModal = () => {
  const { closeModal } = useModal();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);

  const handleCloseModal = () => {
    // TODO: implement language change logic

    closeModal(MODALS.LANGUAGE_SELECTION);
  };

  const handleSelectLanguage = (code: LanguageCode) => {
    setSelectedLanguage(code);
  };

  return (
    <BottomModal
      modalId={MODALS.LANGUAGE_SELECTION} 
      title="Language / Язык" 
      titleWrapperStyles={styles.titleStyles} 
      onClose={handleCloseModal}
    >
      <div className={styles.wrapper}>
        <div className={styles.languageSection}>
          {LANGUAGES.map((language) => (
            <LanguageOption
              key={language.code}
              language={language}
              isSelected={selectedLanguage === language.code}
              onSelect={handleSelectLanguage}
            />
          ))}
        </div>

        <button 
          className={styles.applyButton} 
          onClick={handleCloseModal}
        >
          Apply / Применить
        </button>
      </div>
    </BottomModal>
  );
};

export default LanguageSelectionModal;