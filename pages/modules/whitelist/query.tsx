import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useAppStore, useWhitelistModuleStore } from "store"
import {
  WhitelistModuleIsMember,
  WhitelistModuleMembers,
} from "components/forms/query"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = [
  "get_contract_config",
  "list_whitelist_members",
  "check_whitelist_status",
  "check_whitelist_membership",
]

export default function FeeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = useWhitelistModuleStore((state) => state)
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

      const whitelistModule = await kompleClient.whitelistModule(contract)
      const client = whitelistModule.queryClient

      switch (queryMsg) {
        case "get_contract_config":
          setResponse(await client.config())
          break
        case "list_whitelist_members": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await client.members(msg))
          break
        }
        case "check_whitelist_status":
          setResponse(await client.isActive())
          break
        case "check_whitelist_membership": {
          const msg = {
            member: store.member,
          }

          setResponse(await client.isMember(msg))
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Whitelist Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Whitelist Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Whitelist Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Whitelist Module"
        description="Whitelist Module is used for whitelist management for collections."
        documentation={DOC_LINKS.modules.whitelist}
      />
      <ContractForm
        name="Whitelist"
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

        {queryMsg === "list_whitelist_members" && <WhitelistModuleMembers />}
        {queryMsg === "check_whitelist_membership" && (
          <WhitelistModuleIsMember />
        )}
      </ContractForm>
    </div>
  )
}
