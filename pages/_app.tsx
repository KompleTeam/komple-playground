import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Navbar } from "../components/Navbar"
import { Layout } from "../components/Layout"
import { WalletProvider } from "@cosmos-kit/react"
import { SignerOptions } from "@cosmos-kit/core"
import { chains, assets } from "chain-registry"
import { Chain } from "@chain-registry/types"
import { wallets } from "@cosmos-kit/keplr"
import { GasPrice } from "@cosmjs/stargate"

const JUNO_TESTNET = chains.filter((chain) => chain.chain_id === "uni-5")[0]
const JUNO_MAINNET = chains.filter((chain) => chain.chain_id === "juno-1")[0]

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
    <WalletProvider
      chains={[JUNO_MAINNET, JUNO_TESTNET]}
      assetLists={assets}
      wallets={wallets}
      signerOptions={signerOptions}
    >
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  )
}
