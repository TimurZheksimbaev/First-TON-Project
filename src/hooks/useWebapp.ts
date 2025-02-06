import { useEffect } from 'react';
import WebApp from "@twa-dev/sdk";
import { useModal } from './useModal';
import { MODALS } from '../constants/modals';

interface UseWebAppProps {
    onSettingsClick?: () => void;
}

export const useWebApp = ({ onSettingsClick }: UseWebAppProps) => {
  const { getModalState } = useModal();
  const { isOpen } = getModalState(MODALS.SETTINGS);

  useEffect(() => {
    WebApp.ready();
    WebApp.SettingsButton.show();

    const handleSettingsClick = () => {
      WebApp.SettingsButton.hide();
      onSettingsClick?.();
    };

    WebApp.SettingsButton.onClick(handleSettingsClick);
    return () => {
      WebApp.SettingsButton.offClick(handleSettingsClick);
    };
  }, [onSettingsClick]);

  useEffect(() => {
    isOpen ? WebApp.SettingsButton.hide() : WebApp.SettingsButton.show();
  }, [isOpen]);

  return { platform: WebApp.platform };
};