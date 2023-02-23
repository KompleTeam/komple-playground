import { useChain } from "@cosmos-kit/react"
import { KompleClient } from "komplejs"
import { useEffect, useState } from "react"
import { useAppStore } from "store"

export const useKompleClient = () => {
  const { currentChain } = useAppStore((state) => state)
  const {
    getSigningCosmWasmClient,
    getOfflineSigner,
    isWalletConnected,
    address,
    chain,
  } = useChain(currentChain)

  const [kompleClient, setKompleClient] = useState<KompleClient | undefined>(
    undefined
  )

  useEffect(() => {
    const getClient = async () => {
      if (isWalletConnected) {
        const signingClient = await getSigningCosmWasmClient()
        const offlineSigner = await getOfflineSigner(chain.chain_id)

        if (signingClient === undefined || offlineSigner === undefined) return

        const komple = new KompleClient(signingClient, offlineSigner)
        setKompleClient(komple)
      } else setKompleClient(undefined)
    }

    getClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWalletConnected])

  return {
    kompleClient,
    address,
  }
}
