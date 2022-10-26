import "../styles/globals.css"
import type { AppProps } from "next/app"
import { GrazProvider, mainnetChains } from "graz"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GrazProvider
      grazOptions={{
        defaultChain: mainnetChains.juno,
      }}
    >
      <Component {...pageProps} />
    </GrazProvider>
  )
}
