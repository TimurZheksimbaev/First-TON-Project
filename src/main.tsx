import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import {mockTelegramEnv, miniApp, requestFullscreen} from "@telegram-apps/sdk"

const manifestUrl = 'https://timurzheksimbaev.github.io/First-TON-Project/tonconnect-manifest.json'

const initializeTelegramSDK = () => {
  try {
    requestFullscreen()
    miniApp.ready();
    miniApp.setHeaderColor('#1C1D22');
    miniApp.mount()
  } catch (error) {
    
    mockTelegramEnv({
      themeParams: {
        bgColor: '#141319',
        headerBgColor: '#1C1D22',
      },
      version: '7.2',
      platform: 'ios',
    });

  }
};

initializeTelegramSDK()

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
  </TonConnectUIProvider>

)
