import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useAppStore } from "store"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = ["config", "operators"]

export default function MergeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
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

      const mergeModule = await kompleClient.mergeModule(contract)
      const client = mergeModule.queryClient

      switch (queryMsg) {
        case "config":
          setResponse(await client.config())
          break
        case "operators":
          setResponse(await client.operators())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Merge Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Merge Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Merge Module | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Merge Module"
        description="Merge Module is used for merging multiple tokens and minting a new one."
        documentation={DOC_LINKS.modules.merge}
      />
      <ContractForm
        name="Merge"
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
      </ContractForm>
    </div>
  )
}
