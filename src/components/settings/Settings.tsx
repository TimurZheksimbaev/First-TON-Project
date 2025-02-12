import settings from '../../assets/icons/settings.svg'
import styles from './Settings.module.scss'
import {useModal} from "../../hooks/useModal.ts";
import {MODALS} from "../../constants/modals.ts";

export const Settings = () => {
    const {openModal} = useModal()
    return (
        <div className={styles.settingsIconWrapper} onClick={() => openModal(MODALS.SETTINGS)}>
            <img className={styles.settingsIcon} src={settings} alt="Settings" />
        </div>
    );
}