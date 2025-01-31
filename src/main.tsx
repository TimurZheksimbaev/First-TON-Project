import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ModalsProvider } from './providers/ModalsProvider.tsx'


const manifestUrl = 'https://timurzheksimbaev.github.io/First-TON-Project/tonconnect-manifest.json'

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </TonConnectUIProvider>
)
