import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import usePermissionModuleStore from "store/modules/permission"
import {
  PermissionModuleModulePermissions,
  PermissionModulePermissionAddress,
} from "components/forms/query/permission"

const QUERIES = ["permission_address", "module_permissions", "operators"]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = usePermissionModuleStore((state) => state)

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
      const permissionModule = await kompleClient.permissionModule(contract)
      const queryClient = permissionModule.queryClient

      switch (queryMsg) {
        case "permission_address": {
          const msg = {
            permission: store.permission,
          }

          return setResponse(await queryClient.permissionAddress(msg))
        }
        case "module_permissions": {
          const msg = {
            module: store.module,
          }

          return setResponse(await queryClient.modulePermissions(msg))
        }
        case "operators":
          return setResponse(await queryClient.operators())
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Query Permission Module</title>
        <meta
          property="og:title"
          content="Query Permission Module"
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

        {queryMsg === "permission_address" && (
          <PermissionModulePermissionAddress />
        )}
        {queryMsg === "module_permissions" && (
          <PermissionModuleModulePermissions />
        )}
      </ContractForm>
    </div>
  )
}
