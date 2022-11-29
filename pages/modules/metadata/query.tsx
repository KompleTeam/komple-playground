import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import useMetadataModuleStore from "store/modules/metadata"
import {
  MetadataModuleMetadata,
  MetadataModuleMetadatas,
  MetadataModuleRawMetadata,
  MetadataModuleRawMetadatas,
} from "components/forms/query/modules/metadata"

const QUERIES = [
  "config",
  "raw_metadata",
  "metadata",
  "raw_metadatas",
  "metadatas",
  "operators",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMetadataModuleStore((state) => state)

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
      const metadataModule = await kompleClient.metadataModule(contract)
      const client = metadataModule.queryClient

      switch (queryMsg) {
        case "config":
          return setResponse(await client.config())
        case "raw_metadata": {
          const msg = {
            metadataId: store.id,
          }

          return setResponse(await client.rawMetadata(msg))
        }
        case "metadata": {
          const msg = {
            tokenId: store.id,
          }

          return setResponse(await client.metadata(msg))
        }
        case "raw_metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await client.rawMetadatas(msg))
        }
        case "metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await client.metadatas(msg))
        }
        case "operators":
          return setResponse(await client.operators())
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Execute Metadata Module</title>
        <meta
          property="og:title"
          content="Execute Metadata Module"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Metadata Module"
        description="Metadata Module is used for keeping metadata information of a collection."
        documentation={DOC_LINKS.modules.metadata}
      />
      <ContractForm
        name="Metadata"
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

        {queryMsg === "metadata" && <MetadataModuleMetadata />}
        {queryMsg === "metadatas" && <MetadataModuleMetadatas />}
        {queryMsg === "raw_metadata" && <MetadataModuleRawMetadata />}
        {queryMsg === "raw_metadatas" && <MetadataModuleRawMetadatas />}
      </ContractForm>
    </div>
  )
}
