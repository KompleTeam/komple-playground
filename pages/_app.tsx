import "../styles/globals.css"
import type { AppProps } from "next/app"
import { GrazProvider, mainnetChains } from "graz"
import { Navbar } from "../components/Navbar"
import { Layout } from "../components/Layout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GrazProvider
      grazOptions={{
        defaultChain: mainnetChains.juno,
      }}
    >
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GrazProvider>
  )
}
