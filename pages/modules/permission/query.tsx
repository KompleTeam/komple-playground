import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useAppStore, usePermissionModuleStore } from "store"
import {
  PermissionModuleModulePermissions,
  PermissionModulePermissionAddress,
} from "components/forms/query"

const QUERIES = [
  "get_permission_address",
  "list_permissions_for_module",
  "list_contract_operators",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = usePermissionModuleStore((state) => state)
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
      const permissionModule = await kompleClient.permissionModule(contract)
      const queryClient = permissionModule.queryClient

      switch (queryMsg) {
        case "get_permission_address": {
          const msg = {
            permission: store.permission,
          }

          return setResponse(await queryClient.permissionAddress(msg))
        }
        case "list_permissions_for_module": {
          const msg = {
            module: store.module,
          }

          return setResponse(await queryClient.modulePermissions(msg))
        }
        case "list_contract_operators":
          return setResponse(await queryClient.operators())
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

        {queryMsg === "get_permission_address" && (
          <PermissionModulePermissionAddress />
        )}
        {queryMsg === "list_permissions_for_module" && (
          <PermissionModuleModulePermissions />
        )}
      </ContractForm>
    </div>
  )
}
