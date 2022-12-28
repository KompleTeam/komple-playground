import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useAppStore } from "store"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = ["get_contract_config"]

export default function OwnershipPermissionQuery() {
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

      const ownershipPermission = await kompleClient.ownershipPermission(
        contract
      )
      const client = ownershipPermission.queryClient

      switch (queryMsg) {
        case "get_contract_config":
          setResponse(await client.config())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Ownership Permission",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Ownership Permission | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Ownership Permission | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Ownership Permission"
        description="Link Permission is used to check the ownership of an user for a token."
        documentation={DOC_LINKS.permissions.ownership}
      />
      <ContractForm
        name="Ownership"
        isModule={false}
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
