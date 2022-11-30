import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES = ["get_contract_config"]

export default function OwnershipPermissionQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

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
      const ownershipPermission = await kompleClient.ownershipPermission(
        contract
      )
      const client = ownershipPermission.queryClient

      switch (queryMsg) {
        case "get_contract_config":
          return setResponse(await client.config())
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
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
