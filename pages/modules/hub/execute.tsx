import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import {
  HubModuleExecuteForm,
  HubModuleExecuteType,
  HubModuleExecuteFormMsg,
} from "components/forms/execute"
import { KompleClient } from "komplejs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"

const EXECUTES: HubModuleExecuteType[] = [
  "register_module",
  "deregister_module",
  "update_hub_info",
  "update_operators",
  "migrate_contracts",
]

export default function FeeModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const [executeMsg, setExecuteMsg] = useState<HubModuleExecuteType>("")
  const [msg, setMsg] = useState<HubModuleExecuteFormMsg>()
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
      const hubModule = await kompleClient.hubModule(contract)
      const executeClient = hubModule.client

      if (!msg) throw Error("msg is undefined")

      switch (executeMsg) {
        case "register_module":
          return setResponse(
            await executeClient.registerModule({
              codeId: Number(msg.codeId),
              module: msg.module,
              msg:
                msg.jsonMsg !== ""
                  ? toBinary(JSON.parse(msg.jsonMsg))
                  : undefined,
            })
          )
        case "deregister_module":
          return setResponse(
            await executeClient.deregisterModule({
              module: msg.module,
            })
          )
        case "update_hub_info":
          return setResponse(
            await executeClient.updateHubInfo({
              name: msg.name,
              description: msg.description,
              image: msg.image,
              externalLink: msg.link === "" ? undefined : msg.link,
            })
          )
        case "update_operators":
          return setResponse(
            await executeClient.updateOperators({
              addrs: msg.operators,
            })
          )
        case "migrate_contracts":
          return setResponse(
            await executeClient.migrateContracts({
              codeId: Number(msg.codeId),
              contractAddress: msg.contractAddress,
              msg: msg.jsonMsg !== "" ? toBinary(JSON.parse(msg.jsonMsg)) : "",
            })
          )
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Execute Hub Module</title>
        <meta property="og:title" content="Execute Hub Module" key="title" />
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
        action="execute"
        submit={submit}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        <HubModuleExecuteForm executeMsg={executeMsg} onChange={setMsg} />
      </ContractForm>
    </div>
  )
}
