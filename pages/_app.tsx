import "../styles/globals.css"
import "../styles/datepicker.css"
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from "next/app"
import { Navbar } from "../components/Navbar"
import { Layout } from "../components/Layout"
import { WalletProvider } from "@cosmos-kit/react"
import { SignerOptions } from "@cosmos-kit/core"
import { chains, assets } from "chain-registry"
import { Chain } from "@chain-registry/types"
import { wallets } from "@cosmos-kit/keplr"
import { GasPrice } from "@cosmjs/stargate"
import { Footer } from "components/Footer"
import { ToastContainer } from "react-toastify"

const JUNO_TESTNET = chains.filter(
  (chain) => chain.chain_name === "junotestnet"
)[0]
const JUNO_MAINNET = chains.filter((chain) => chain.chain_name === "juno")[0]

const signerOptions: SignerOptions = {
  signingCosmwasm: (chain: Chain) => {
    switch (chain.chain_name) {
      case "juno":
        return {
          gasPrice: GasPrice.fromString("0.0025ujuno"),
        }
      case "junotestnet":
        return {
          gasPrice: GasPrice.fromString("0.0025ujuno"),
        }
    }
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <WalletProvider
        chains={[JUNO_MAINNET, JUNO_TESTNET]}
        assetLists={assets}
        wallets={wallets}
        signerOptions={signerOptions}
      >
        <div className="min-h-screen flex flex-col justify-between">
          <div>
            <Navbar />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
          <Footer />
        </div>
      </WalletProvider>
      <ToastContainer style={{ top: "100px" }} />
    </div>
  )
}
