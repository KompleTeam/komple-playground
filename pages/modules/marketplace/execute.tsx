import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
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
import { useKompleClient } from "hooks/kompleClient"
import { showToast } from "utils/showToast"
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate"
import { InfoBoxProps } from "components/InfoBox"

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
  const { kompleClient } = useKompleClient()

  const store = useMarketplaceModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const marketplaceModule = await kompleClient.marketplaceModule(contract)
      const executeClient = marketplaceModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "update_marketplace_buy_lock": {
          const msg = {
            lock: store.lock,
          }

          response = await executeClient.updateBuyLock(msg)
          break
        }
        case "list_fixed_price_NFT": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
            price: store.price.toString(),
          }

          response = await executeClient.listFixedToken(msg)
          break
        }
        case "remove_fixed_price_NFT": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          response = await executeClient.delistFixedToken(msg)
          break
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

          response = await executeClient.updatePrice(msg)
          break
        }
        case "buy_NFT": {
          if (store.listingType === undefined) {
            throw new Error("listing type is not defined")
          }

          const priceRes = await marketplaceModule.queryClient.fixedListing({
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          })

          const msg = {
            listingType: store.listingType,
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          response = await executeClient.buy(msg, "auto", undefined, [
            coin(priceRes.data.price, "ujunox"),
          ])
          break
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

          response = await executeClient.permissionBuy(msg)
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateOperators(msg)
          break
        }
        case "lock_execute_messages": {
          response = await executeClient.lockExecute()
          break
        }
        default:
          throw new Error("Invalid execute message")
      }

      const infoBoxList: InfoBoxProps[] = [
        {
          title: "Transaction Hash",
          data: response.transactionHash,
          short: true,
        },
      ]

      setResponseInfoBoxList(infoBoxList)
      setResponse(response)
      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Marketplace Module",
        message: error.message,
      })
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
