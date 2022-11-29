import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES = ["config"]

export default function LinkPermissionQuery() {
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
      const linkPermission = await kompleClient.linkPermission(contract)
      const client = linkPermission.queryClient

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
        <title>Query Link Permission</title>
        <meta property="og:title" content="Query Link Permission" key="title" />
      </Head>

      <ContractHeader
        title="Link Permission"
        description="Link Permission is used for checking the linked collections of a collection."
        documentation={DOC_LINKS.permissions.link}
      />
      <ContractForm
        name="Link"
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
