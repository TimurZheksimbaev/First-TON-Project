import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ModalsProvider } from './providers/ModalsProvider.tsx'
import { TonClientProvider } from './context/ton-client-context.tsx'


const manifestUrl = 'https://timurzheksimbaev.github.io/First-TON-Project/tonconnect-manifest.json'

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <TonClientProvider>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </TonClientProvider>
  </TonConnectUIProvider>
)
