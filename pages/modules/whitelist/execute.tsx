import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import useWhitelistModuleStore from "store/modules/whitelist"
import {
  WhitelistModuleAddMembers,
  WhitelistModuleRemoveMembers,
  WhitelistModuleUpdateWhitelistConfig,
} from "components/forms/execute/modules"

const EXECUTES = ["update_whitelist_config", "add_members", "remove_members"]

export default function WhitelistModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useWhitelistModuleStore((state) => state)

  const [executeMsg, setExecuteMsg] = useState<string>("")
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
      const whitelistModule = await kompleClient.whitelistModule(contract)
      const client = whitelistModule.client

      switch (executeMsg) {
        case "update_whitelist_config": {
          const msg = {
            whitelistConfig: store.config,
          }

          return setResponse(await client.updateWhitelistConfig(msg))
        }
        case "add_members": {
          const msg = {
            members: store.members,
          }

          return setResponse(await client.addMembers(msg))
        }
        case "remove_members": {
          const msg = {
            members: store.members,
          }

          return setResponse(await client.removeMembers(msg))
        }
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Execute Whitelist Module</title>
        <meta
          property="og:title"
          content="Execute Whitelist Module"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Whitelist Module"
        description="Whitelist Module is used for whitelist management for collections."
        documentation={DOC_LINKS.modules.whitelist}
      />
      <ContractForm
        name="Whitelist"
        isModule={true}
        response={response}
        action="execute"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "update_whitelist_config" && (
          <WhitelistModuleUpdateWhitelistConfig />
        )}
        {executeMsg === "add_members" && <WhitelistModuleAddMembers />}
        {executeMsg === "remove_members" && <WhitelistModuleRemoveMembers />}
      </ContractForm>
    </div>
  )
}
