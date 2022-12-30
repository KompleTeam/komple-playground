import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useAppStore, useMetadataModuleStore } from "store"
import {
  MetadataModuleMetadata,
  MetadataModuleMetadatas,
  MetadataModuleRawMetadata,
  MetadataModuleRawMetadatas,
} from "components/forms/query"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = [
  "contract_config",
  "get_raw_metadata",
  "get_metadata",
  "list_raw_metadatas",
  "list_metadatas",
  "contract_operators",
]

export default function FeeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = useMetadataModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const metadataModule = await kompleClient.metadataModule(contract)
      const client = metadataModule.queryClient

      switch (queryMsg) {
        case "contract_config":
          setResponse(await client.config())
          break
        case "get_raw_metadata": {
          const msg = {
            metadataId: store.id,
          }

          setResponse(await client.rawMetadata(msg))
          break
        }
        case "get_metadata": {
          const msg = {
            tokenId: store.id,
          }

          setResponse(await client.metadata(msg))
          break
        }
        case "list_raw_metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await client.rawMetadatas(msg))
          break
        }
        case "list_metadatas": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await client.metadatas(msg))
          break
        }
        case "contract_operators":
          setResponse(await client.operators())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Metadata Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Metadata Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Metadata Module | Komple Playground"
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
