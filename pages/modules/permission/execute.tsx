import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { ExecuteResult, toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useAppStore, usePermissionModuleStore } from "store"
import {
  PermissionModuleCheck,
  PermissionModuleRegisterPermission,
  PermissionModuleUpdateModulePermissions,
  PermissionModuleUpdateOperators,
} from "components/forms/execute"
import { showToast } from "utils/showToast"
import { InfoBoxProps } from "components/InfoBox"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = [
  "register_permission",
  "update_permissions_for_module",
  "check_permission",
  "update_contract_operators",
  "lock_execute_messages",
]

export default function PermissionModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = usePermissionModuleStore((state) => state)
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

      const permissionModule = await kompleClient.permissionModule(contract)
      const executeClient = permissionModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "register_permission": {
          const msg = {
            codeId: store.codeId,
            permission: store.permission,
            msg: store.msg !== undefined ? toBinary(store.msg) : undefined,
          }

          response = await executeClient.registerPermission(msg)
          break
        }
        case "update_permissions_for_module": {
          const msg = {
            module: store.module,
            permissions: store.permissions,
          }

          response = await executeClient.updateModulePermissions(msg)
          break
        }
        case "check_permission": {
          if (store.msg === undefined) {
            throw new Error("msg is undefined")
          }

          const msg = {
            module: store.module,
            msg: store.msg,
          }

          response = await executeClient.check(msg)
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateOperators(msg)
          break
        }
        case "lock_execute_messages": {
          response = await executeClient.lockExecute()
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
        title: "Execute Permission Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Permission Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Permission Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Permission Module"
        description="Permission Module is used to perform some actions - execute or query - in front of some of the operations."
        documentation={DOC_LINKS.modules.permission}
      />
      <ContractForm
        name="Permission"
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

        {executeMsg === "register_permission" && (
          <PermissionModuleRegisterPermission />
        )}
        {executeMsg === "update_permissions_for_module" && (
          <PermissionModuleUpdateModulePermissions />
        )}
        {executeMsg === "check_permission" && <PermissionModuleCheck />}
        {executeMsg === "update_contract_operators" && (
          <PermissionModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
