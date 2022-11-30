import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWhitelistModuleStore } from "store"
import {
  WhitelistModuleIsMember,
  WhitelistModuleMembers,
} from "components/forms/query"

const QUERIES = [
  "get_contract_config",
  "list_whitelist_members",
  "check_whitelist_status",
  "check_whitelist_membership",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useWhitelistModuleStore((state) => state)

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
      const whitelistModule = await kompleClient.whitelistModule(contract)
      const client = whitelistModule.queryClient

      switch (queryMsg) {
        case "get_contract_config":
          return setResponse(await client.config())
        case "list_whitelist_members": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await client.members(msg))
        }
        case "check_whitelist_status":
          return setResponse(await client.isActive())
        case "check_whitelist_membership": {
          const msg = {
            member: store.member,
          }

          return setResponse(await client.isMember(msg))
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
        <title>Whitelist Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Whitelist Module | Komple Framework Playground"
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

        {queryMsg === "list_whitelist_members" && <WhitelistModuleMembers />}
        {queryMsg === "check_whitelist_membership" && (
          <WhitelistModuleIsMember />
        )}
      </ContractForm>
    </div>
  )
}
