import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { TonClientProvider } from './context/ton-client-context.tsx'
import { ModalsProvider } from './providers/ModalsProvider.tsx'
// import { SDKProvider } from '@telegram-apps/sdk-react'



const manifestUrl = 'https://timurzheksimbaev.github.io/First-TON-Project/tonconnect-manifest.json'

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}> 
    <TonClientProvider>
      {/* <SDKProvider acceptCustomStyles debug> */}
        <ModalsProvider>
          <App />
        </ModalsProvider>
      {/* </SDKProvider> */}
    </TonClientProvider>
  </TonConnectUIProvider> 
)
