import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import {
  HubModuleQueryForm,
  HubModuleQueryType,
  HubModuleQueryFormMsg,
} from "components/forms/query"
import { KompleClient } from "komplejs"
import Head from "next/head"

const QUERIES: HubModuleQueryType[] = ["config", "module_address", "operators"]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const [queryMsg, setQueryMsg] = useState<HubModuleQueryType>("")
  const [msg, setMsg] = useState<HubModuleQueryFormMsg>()
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
      const hubModule = await kompleClient.hubModule(contract)
      const queryClient = hubModule.queryClient

      if (!msg) throw Error("msg is undefined")

      switch (queryMsg) {
        case "config":
          return setResponse(await queryClient.config())
        case "module_address":
          return setResponse(
            await queryClient.moduleAddress({
              module: msg.module,
            })
          )
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
        <title>Query Hub Module</title>
        <meta property="og:title" content="Query Hub Module" key="title" />
      </Head>

      <ContractHeader
        title="Hub Module"
        description="Hub module is the centre piece of the Komple Framework."
        documentation={DOC_LINKS.modules.hub}
      />
      <ContractForm
        name="Hub"
        isModule={true}
        response={response}
        action="query"
        submit={submit}
      >
        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        <HubModuleQueryForm query={queryMsg} onChange={setMsg} />
      </ContractForm>
    </div>
  )
}
