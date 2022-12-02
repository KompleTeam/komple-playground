import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useAppStore, useMetadataModuleStore } from "store"
import {
  MetadataModuleMetadata,
  MetadataModuleMetadatas,
  MetadataModuleRawMetadata,
  MetadataModuleRawMetadatas,
} from "components/forms/query"

const QUERIES = [
  "contract_config",
  "get_raw_metadata",
  "get_metadata",
  "list_raw_metadatas",
  "list_metadatas",
  "contract_operators",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMetadataModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const metadataModule = await kompleClient.metadataModule(contract)
      const client = metadataModule.queryClient

      switch (queryMsg) {
        case "contract_config":
          return setResponse(await client.config())
        case "get_raw_metadata": {
          const msg = {
            metadataId: store.id,
          }

          return setResponse(await client.rawMetadata(msg))
        }
        case "get_metadata": {
          const msg = {
            tokenId: store.id,
          }

          return setResponse(await client.metadata(msg))
        }
        case "list_raw_metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await client.rawMetadatas(msg))
        }
        case "list_metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await client.metadatas(msg))
        }
        case "contract_operators":
          return setResponse(await client.operators())
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
        <title>Metadata Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Metadata Module | Komple Framework Playground"
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

        {queryMsg === "get_metadata" && <MetadataModuleMetadata />}
        {queryMsg === "list_metadatas" && <MetadataModuleMetadatas />}
        {queryMsg === "get_raw_metadata" && <MetadataModuleRawMetadata />}
        {queryMsg === "list_raw_metadatas" && <MetadataModuleRawMetadatas />}
      </ContractForm>
    </div>
  )
}
