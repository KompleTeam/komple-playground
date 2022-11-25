import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import {
  MintModuleQueryForm,
  MintModuleQueryType,
  MintModuleQueryFormMsg,
} from "components/forms/query"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES: MintModuleQueryType[] = [
  "config",
  "collection_address",
  "collection_info",
  "operators",
  "linked_collections",
  "collections",
  "creators",
  "mint_lock",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const [queryMsg, setQueryMsg] = useState<MintModuleQueryType>("")
  const [msg, setMsg] = useState<MintModuleQueryFormMsg>()
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

      if (!msg) throw Error("msg is undefined")

      switch (queryMsg) {
        case "config":
          return setResponse(await queryClient.config())
        case "collection_address":
          return setResponse(
            await queryClient.collectionAddress({
              collectionId: Number(msg.collectionId),
            })
          )
        case "collection_info":
          return setResponse(
            await queryClient.collectionInfo({
              collectionId: Number(msg.collectionId),
            })
          )
        case "operators":
          return setResponse(await queryClient.operators())
        case "linked_collections":
          return setResponse(
            await queryClient.linkedCollections({
              collectionId: Number(msg.collectionId),
            })
          )
        case "collections":
          return setResponse(
            await queryClient.collections({
              blacklist: msg.isBlacklist,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
        case "creators":
          return setResponse(await queryClient.creators())
        case "mint_lock":
          return setResponse(
            await queryClient.mintLock({
              collectionId: Number(msg.collectionId),
            })
          )
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Query Mint Module</title>
        <meta property="og:title" content="Query Mint Module" key="title" />
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

        <MintModuleQueryForm query={queryMsg} onChange={setMsg} />
      </ContractForm>
    </div>
  )
}
