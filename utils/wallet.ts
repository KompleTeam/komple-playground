import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { getConfig, keplrConfig } from "config"

export const getSigningClient = async (signer: OfflineSigner | null) => {
  const config = getConfig("testnet")

  if (!signer) throw Error("Signer is undefined")
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    gasPrice: GasPrice.fromString("0.025ujunox"),
  })
}

export const getKeplrSigner = async () => {
  let config = getConfig("testnet")

  let anywindow = window as any
  if (
    !anywindow.getOfflineSigner ||
    !anywindow.keplr ||
    !anywindow.getOfflineSignerAuto
  ) {
    throw new Error("Keplr extension is not available")
  }

  await anywindow.keplr.experimentalSuggestChain(keplrConfig(config))
  await anywindow.keplr.enable(config.chainId)

  const signer = await anywindow.getOfflineSignerAuto(config.chainId)
  Object.assign(signer, {
    signAmino: (signer as any).signAmino ?? (signer as any).sign,
  })

  return signer
}

export const connect = async () => {
  const signer = await getKeplrSigner()
  const client = await getSigningClient(signer)
  return client
}

export const disconnect = async () => {}
