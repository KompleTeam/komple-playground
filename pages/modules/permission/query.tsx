import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useAppStore, usePermissionModuleStore } from "store"
import {
  PermissionModuleModulePermissions,
  PermissionModulePermissionAddress,
} from "components/forms/query"
import { useKompleClient } from "hooks/kompleClient"
import { showToast } from "utils/showToast"

const QUERIES = [
  "get_permission_address",
  "list_permissions_for_module",
  "list_contract_operators",
]

export default function FeeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = usePermissionModuleStore((state) => state)
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

      const permissionModule = await kompleClient.permissionModule(contract)
      const queryClient = permissionModule.queryClient

      switch (queryMsg) {
        case "get_permission_address": {
          const msg = {
            permission: store.permission,
          }

          setResponse(await queryClient.permissionAddress(msg))
          break
        }
        case "list_permissions_for_module": {
          const msg = {
            module: store.module,
          }

          setResponse(await queryClient.modulePermissions(msg))
          break
        }
        case "list_contract_operators":
          setResponse(await queryClient.operators())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Permission Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Permission Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Permission Module | Komple Playground"
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
