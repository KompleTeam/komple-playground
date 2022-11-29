import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import {
  MintModuleCollectionAddress,
  MintModuleCollectionInfo,
  MintModuleCollections,
  MintModuleLinkedCollections,
  MintModuleMintLock,
} from "components/forms/query"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useMintModuleStore } from "store"

const QUERIES = [
  "config",
  "collection_address",
  "collection_info",
  "operators",
  "linked_collections",
  "collections",
  "creators",
  "mint_lock",
]

export default function MintModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMintModuleStore((state) => state)

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
      const mintModule = await kompleClient.mintModule(contract)
      const queryClient = mintModule.queryClient

      switch (queryMsg) {
        case "config":
          return setResponse(await queryClient.config())
        case "collection_address": {
          const msg = {
            collectionId: store.collectionId,
          }

          return setResponse(await queryClient.collectionAddress(msg))
        }
        case "collection_info": {
          const msg = {
            collectionId: store.collectionId,
          }

          return setResponse(await queryClient.collectionInfo(msg))
        }
        case "operators":
          return setResponse(await queryClient.operators())
        case "linked_collections": {
          const msg = {
            collectionId: store.collectionId,
          }

          return setResponse(await queryClient.linkedCollections(msg))
        }
        case "collections": {
          const msg = {
            blacklist: store.isBlacklist,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.collections(msg))
        }
        case "creators":
          return setResponse(await queryClient.creators())
        case "mint_lock": {
          const msg = {
            collectionId: store.collectionId,
          }

          return setResponse(await queryClient.mintLock(msg))
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
        <title>Mint Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Mint Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Mint Module"
        description="Mint Module is used for collection management and token minting."
        documentation={DOC_LINKS.modules.mint}
      />
      <ContractForm
        name="Mint"
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

        {queryMsg === "collection_address" && <MintModuleCollectionAddress />}
        {queryMsg === "collection_info" && <MintModuleCollectionInfo />}
        {queryMsg === "linked_collections" && <MintModuleLinkedCollections />}
        {queryMsg === "collections" && <MintModuleCollections />}
        {queryMsg === "mint_lock" && <MintModuleMintLock />}
      </ContractForm>
    </div>
  )
}
