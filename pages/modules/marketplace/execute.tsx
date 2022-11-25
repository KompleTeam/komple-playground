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
} from "components/forms/execute/marketplace"
import useMarketplaceModuleStore from "store/modules/marketplace"

const EXECUTES = [
  "update_buy_lock",
  "list_fixed_token",
  "delist_fixed_token",
  "update_price",
  "buy",
  "permission_buy",
  "update_operators",
  "lock_execute",
]

export default function MintModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMarketplaceModuleStore((state) => state)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const marketplaceModule = await kompleClient.marketplaceModule(contract)
      const executeClient = marketplaceModule.client

      switch (executeMsg) {
        case "update_buy_lock": {
          const msg = {
            lock: store.lock,
          }

          return setResponse(await executeClient.updateBuyLock(msg))
        }
        case "list_fixed_token": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
            price: store.price.toString(),
          }

          return setResponse(await executeClient.listFixedToken(msg))
        }
        case "delist_fixed_token": {
          const msg = {
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.delistFixedToken(msg))
        }
        case "update_price": {
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
        case "buy": {
          if (store.listingType === undefined) {
            throw new Error("listing type is not defined")
          }

          const msg = {
            listingType: store.listingType,
            collectionId: store.collectionId,
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.buy(msg))
        }
        case "permission_buy": {
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
        case "update_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateOperators(msg))
        }
        case "lock_execute": {
          return setResponse(await executeClient.lockExecute())
        }
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Create Marketplace Module</title>
        <meta
          property="og:title"
          content="Create Marketplace Module"
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

        {executeMsg === "update_buy_lock" && <MarketplaceModuleUpdateBuyLock />}
        {executeMsg === "list_fixed_token" && (
          <MarketplaceModuleListFixedToken />
        )}
        {executeMsg === "delist_fixed_token" && (
          <MarketplaceModuleDelistFixedToken />
        )}
        {executeMsg === "update_price" && <MarketplaceModuleUpdatePrice />}
        {executeMsg === "buy" && <MarketplaceModuleBuy />}
        {executeMsg === "permission_buy" && <MarketplaceModulePermissionBuy />}
        {executeMsg === "update_operators" && (
          <MarketplaceModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
