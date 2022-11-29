import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import usePermissionModuleStore from "store/modules/permission"
import {
  PermissionModuleCheck,
  PermissionModuleRegisterPermission,
  PermissionModuleUpdateModulePermissions,
  PermissionModuleUpdateOperators,
} from "components/forms/execute/modules"

const EXECUTES = [
  "register_permission",
  "update_module_permissions",
  "check",
  "update_operators",
  "lock_execute",
]

export default function PermissionModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = usePermissionModuleStore((state) => state)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const permissionModule = await kompleClient.permissionModule(contract)
      const executeClient = permissionModule.client

      switch (executeMsg) {
        case "register_module": {
          const msg = {
            codeId: store.codeId,
            permission: store.permission,
            msg: store.msg !== undefined ? toBinary(store.msg) : undefined,
          }

          return setResponse(await executeClient.registerPermission(msg))
        }
        case "update_module_permissions": {
          const msg = {
            module: store.module,
            permissions: store.permissions,
          }

          return setResponse(await executeClient.updateModulePermissions(msg))
        }
        case "check": {
          if (store.msg === undefined) {
            throw new Error("msg is undefined")
          }

          const msg = {
            module: store.module,
            msg: store.msg,
          }

          return setResponse(await executeClient.check(msg))
        }
        case "update_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateOperators(msg))
        }
        case "lock_execute": {
          return setResponse(await executeClient.lockExecute())
        }
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Execute Permission Module</title>
        <meta
          property="og:title"
          content="Execute Permission Module"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Permission Module"
        description="Permission Module is used to perform some actions - execute or query - in front of some of the operations"
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
        {executeMsg === "update_module_permissions" && (
          <PermissionModuleUpdateModulePermissions />
        )}
        {executeMsg === "check" && <PermissionModuleCheck />}
        {executeMsg === "update_operators" && (
          <PermissionModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
