import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
import { ExecuteResult, toBinary } from "@cosmjs/cosmwasm-stargate"
import { OwnershipPermissionCheck } from "components/forms/execute"
import { useAppStore, useOwnershipPermissionStore } from "store"
import { InfoBoxProps } from "components/InfoBox"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = ["check_permission"]

export default function OwnershipPermissionExecute() {
  const { kompleClient } = useKompleClient()

  const store = useOwnershipPermissionStore((state) => state)
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

      const ownershipPermission = await kompleClient.ownershipPermission(
        contract
      )
      const client = ownershipPermission.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "check_permission": {
          const msg = {
            data: store.data === undefined ? "" : toBinary(store.data),
          }

          response = await client.check(msg)
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
        title: "Execute Ownership Permission",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Ownership Permission | Komple Playground</title>
        <meta
          property="og:title"
          content="Ownership Permission | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Ownership Permission"
        description="Ownership Permission is used to check the ownership of an user for a token."
        documentation={DOC_LINKS.permissions.ownership}
      />
      <ContractForm
        name="Ownership"
        isModule={false}
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

        {executeMsg === "check_permission" && <OwnershipPermissionCheck />}
      </ContractForm>
    </div>
  )
}
