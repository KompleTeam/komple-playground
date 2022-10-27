import { mainnetChains } from "graz"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"

export const getSigningClient = async (signer: OfflineSigner | null) => {
  if (!signer) throw Error("Signer is undefined")
  return SigningCosmWasmClient.connectWithSigner(
    mainnetChains.juno.rpc,
    signer,
    { gasPrice: GasPrice.fromString("0.025ujuno") }
  )
}
