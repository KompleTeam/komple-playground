import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import {
  MarketplaceModuleUpdateBuyLock,
  MarketplaceModuleListFixedToken,
  MarketplaceModuleDelistFixedToken,
  MarketplaceModuleUpdatePrice,
  MarketplaceModuleBuy,
  MarketplaceModulePermissionBuy,
  MarketplaceModuleUpdateOperators,
} from "components/forms/execute"
import { useMarketplaceModuleStore, useAppStore } from "store"
import { coin } from "@cosmjs/proto-signing"

const EXECUTES = [
  "update_marketplace_buy_lock",
  "list_fixed_price_NFT",
  "remove_fixed_price_NFT",
  "update_listing_price",
  "buy_NFT",
  "buy_NFT_with_permissions",
  "update_contract_operators",
  "lock_execute_messages",
]

export default function MarketplaceModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMarketplaceModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const marketplaceModule = await kompleClient.marketplaceModule(contract)
      const executeClient = marketplaceModule.client

      switch (executeMsg) {
        case "update_marketplace_buy_lock": {
          const msg = {
            lock: store.lock,
          }

          return setResponse(await executeClient.updateBuyLock(msg))
        }
        case "list_fixed_price_NFT": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
            price: store.price.toString(),
          }

          return setResponse(await executeClient.listFixedToken(msg))
        }
        case "remove_fixed_price_NFT": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.delistFixedToken(msg))
        }
        case "update_listing_price": {
          if (store.listingType === undefined) {
            throw new Error("listing type is not defined")
          }

          const msg = {
            listingType: store.listingType,
            collectionId: store.collectionId,
            tokenId: store.tokenId,
            price: store.price.toString(),
          }

          return setResponse(await executeClient.updatePrice(msg))
        }
        case "buy_NFT": {
          if (store.listingType === undefined) {
            throw new Error("listing type is not defined")
          }

          const msg = {
            listingType: store.listingType,
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          return setResponse(
            await executeClient.buy(msg, "auto", undefined, [
              coin(1000000, "ujunox"),
            ])
          )
        }
        case "buy_NFT_with_permissions": {
          if (store.listingType === undefined) {
            throw new Error("listing type is not defined")
          }

          const msg = {
            listingType: store.listingType,
            collectionId: store.collectionId,
            tokenId: store.tokenId,
            buyer: store.buyer,
          }

          return setResponse(await executeClient.permissionBuy(msg))
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateOperators(msg))
        }
        case "lock_execute_messages": {
          return setResponse(await executeClient.lockExecute())
        }
      }

      setLoading(false)
    } catch (error: any) {
      setResponse(error.message)
      setLoading(false)
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
        action="execute"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "update_marketplace_buy_lock" && (
          <MarketplaceModuleUpdateBuyLock />
        )}
        {executeMsg === "list_fixed_price_NFT" && (
          <MarketplaceModuleListFixedToken />
        )}
        {executeMsg === "remove_fixed_price_NFT" && (
          <MarketplaceModuleDelistFixedToken />
        )}
        {executeMsg === "update_listing_price" && (
          <MarketplaceModuleUpdatePrice />
        )}
        {executeMsg === "buy_NFT" && <MarketplaceModuleBuy />}
        {executeMsg === "buy_NFT_with_permissions" && (
          <MarketplaceModulePermissionBuy />
        )}
        {executeMsg === "update_contract_operators" && (
          <MarketplaceModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
