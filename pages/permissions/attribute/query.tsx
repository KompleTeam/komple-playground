import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES = ["config"]

export default function AttributePermissionQuery() {
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
      const attributePermission = await kompleClient.attributePermission(
        contract
      )
      const client = attributePermission.queryClient

      switch (queryMsg) {
        case "config":
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
        <title>Query Attribute Permission</title>
        <meta
          property="og:title"
          content="Query Attribute Permission"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Attribute Permission"
        description="Attribute Permission is used for making attribute level comparisons and checks."
        documentation={DOC_LINKS.permissions.attribute}
      />
      <ContractForm
        name="Attribute"
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
