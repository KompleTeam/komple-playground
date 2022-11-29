import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"

import { KompleClient } from "komplejs"
import Head from "next/head"
import useMarketplaceModuleStore from "store/modules/marketplace"
import {
  MarketplaceModuleFixedListing,
  MarketplaceModuleFixedListings,
} from "components/forms/query/marketplace"

const QUERIES = ["config", "fixed_listing", "fixed_listings", "operators"]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMarketplaceModuleStore((state) => state)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const marketplaceModule = await kompleClient.marketplaceModule(contract)
      const queryClient = marketplaceModule.queryClient

      switch (queryMsg) {
        case "config":
          return setResponse(await queryClient.config())
        case "fixed_listing": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          return setResponse(await queryClient.fixedListing(msg))
        }
        case "fixed_listings": {
          const msg = {
            collectionId: store.collectionId,
            startAfter: store.startAfter === 0 ? undefined : store.startAfter,
            limit: store.limit === 0 ? undefined : store.limit,
          }

          return setResponse(await queryClient.fixedListings(msg))
        }
        case "operators":
          return setResponse(await queryClient.operators())
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Marketplace Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Marketplace Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Marketplace Module"
        description="Marketplace Module is used for the second hand sale of tokens."
        documentation={DOC_LINKS.modules.marketplace}
      />
      <ContractForm
        name="Marketplace"
        isModule={true}
        response={response}
        action="query"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        {queryMsg === "fixed_listing" && <MarketplaceModuleFixedListing />}
        {queryMsg === "fixed_listings" && <MarketplaceModuleFixedListings />}
      </ContractForm>
    </div>
  )
}
