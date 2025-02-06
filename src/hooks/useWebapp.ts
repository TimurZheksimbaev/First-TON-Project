import { useEffect, useCallback } from 'react';
import WebApp from "@twa-dev/sdk";
import { useModal } from './useModal';
import { MODALS } from '../constants/modals';

interface UseWebAppProps {
  onSettingsClick?: () => void;
  initiallyShowSettings?: boolean;
}

export const useWebApp = ({
  onSettingsClick,
  initiallyShowSettings = true
}: UseWebAppProps = {}) => {
  const { getModalState } = useModal();
  const { isOpen } = getModalState(MODALS.SETTINGS);

  const showSettingsButton = useCallback(() => {
    if (!WebApp.SettingsButton.isVisible) {
      WebApp.SettingsButton.show();
    }
  }, []);

  const hideSettingsButton = useCallback(() => {
    if (WebApp.SettingsButton.isVisible) {
      WebApp.SettingsButton.hide();
    }
  }, []);

  const initializeWebApp = useCallback(() => {
    WebApp.ready();
    
    if (initiallyShowSettings) {
      showSettingsButton();
    }
  }, [initiallyShowSettings, showSettingsButton]);

  useEffect(() => {
    initializeWebApp();

    return () => {
      hideSettingsButton();
    };
  }, [initializeWebApp, hideSettingsButton]);

  useEffect(() => {
    if (!onSettingsClick) return;

    const handleSettingsClick = () => {
      hideSettingsButton();
      onSettingsClick();
    };

    WebApp.SettingsButton.onClick(handleSettingsClick);

    return () => {
      WebApp.SettingsButton.offClick(handleSettingsClick);
    };
  }, [onSettingsClick, hideSettingsButton]);

  useEffect(() => {
    if (isOpen) {
      hideSettingsButton();
    } else {
      showSettingsButton();
    }
  }, [isOpen, hideSettingsButton, showSettingsButton]);

  return {
    showSettingsButton,
    hideSettingsButton,
    initializeWebApp
  };
};