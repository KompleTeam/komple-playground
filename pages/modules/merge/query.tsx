import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES = ["config", "operators"]

export default function MergeModuleQuery() {
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
      const mergeModule = await kompleClient.mergeModule(contract)
      const client = mergeModule.queryClient

      switch (queryMsg) {
        case "config":
          return setResponse(await client.config())
        case "operators":
          return setResponse(await client.operators())
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Merge Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Merge Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Merge Module"
        description="Merge Module is used for merging multiple tokens and minting a new one."
        documentation={DOC_LINKS.modules.merge}
      />
      <ContractForm
        name="Merge"
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
      </ContractForm>
    </div>
  )
}
