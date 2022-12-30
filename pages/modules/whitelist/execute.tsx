import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
import { useAppStore, useWhitelistModuleStore } from "store"
import {
  WhitelistModuleAddMembers,
  WhitelistModuleRemoveMembers,
  WhitelistModuleUpdateWhitelistConfig,
} from "components/forms/execute"
import { showToast } from "utils/showToast"
import { InfoBoxProps } from "components/InfoBox"
import { useKompleClient } from "hooks/kompleClient"
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate"

const EXECUTES = [
  "update_whitelist_configuration",
  "add_members_to_whitelist",
  "remove_members_from_whitelist",
]

export default function WhitelistModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = useWhitelistModuleStore((state) => state)
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

      const whitelistModule = await kompleClient.whitelistModule(contract)
      const client = whitelistModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "update_whitelist_configuration": {
          const msg = {
            whitelistConfig: store.config,
          }

          response = await client.updateWhitelistConfig(msg)
          break
        }
        case "add_members_to_whitelist": {
          const msg = {
            members: store.members,
          }

          response = await client.addMembers(msg)
          break
        }
        case "remove_members_from_whitelist": {
          const msg = {
            members: store.members,
          }

          response = await client.removeMembers(msg)
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
        title: "Execute Whitelist Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Whitelist Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Whitelist Module | Komple Playground"
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

        {executeMsg === "update_whitelist_configuration" && (
          <WhitelistModuleUpdateWhitelistConfig />
        )}
        {executeMsg === "add_members_to_whitelist" && (
          <WhitelistModuleAddMembers />
        )}
        {executeMsg === "remove_members_from_whitelist" && (
          <WhitelistModuleRemoveMembers />
        )}
      </ContractForm>
    </div>
  )
}
