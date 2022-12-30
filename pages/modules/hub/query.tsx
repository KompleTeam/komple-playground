import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useHubModuleStore, useAppStore } from "store"
import { HubModuleModuleAddress } from "components/forms/query"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = ["contract_config", "get_module_address", "contract_operators"]

export default function HubModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = useHubModuleStore((state) => state)
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

      const hubModule = await kompleClient.hubModule(contract)
      const queryClient = hubModule.queryClient

      switch (queryMsg) {
        case "contract_config":
          setResponse(await queryClient.config())
          break
        case "get_module_address": {
          const msg = {
            module: store.module,
          }

          setResponse(await queryClient.moduleAddress(msg))
          break
        }
        case "contract_operators":
          setResponse(await queryClient.operators())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Hub Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Hub Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Hub Module | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Hub Module"
        description="Hub module is the centre piece of the Komple Framework."
        documentation={DOC_LINKS.modules.hub}
      />
      <ContractForm
        name="Hub"
        isModule={true}
        response={response}
        action="query"
        submit={submit}
      >
        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        {queryMsg === "get_module_address" && <HubModuleModuleAddress />}
      </ContractForm>
    </div>
  )
}
