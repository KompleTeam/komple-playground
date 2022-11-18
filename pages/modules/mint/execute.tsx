import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { getKeplrSigner, getSigningClient } from "utils/wallet"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import {
  MintModuleExecuteForm,
  MintModuleExecuteType,
  MintModuleExecuteFormMsg,
} from "components/forms/execute"
import { KompleClient } from "komplejs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { Seperator } from "components/Seperator"

const EXECUTES: MintModuleExecuteType[] = [
  "create_collection",
  "update_public_collection_creation",
  "update_collection_mint_lock",
  "mint",
  "admin_mint",
  "permission_mint",
  "update_operators",
  "update_linked_collections",
  "update_collection_status",
  "lock_execute",
  "update_creators",
]

export default function FeeModuleExecute() {
  const [executeMsg, setExecuteMsg] = useState<MintModuleExecuteType>("")
  const [msg, setMsg] = useState<MintModuleExecuteFormMsg>()
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signer = await getKeplrSigner()
      const client = await getSigningClient(signer)
      const kompleClient = new KompleClient(client, signer)
      const mintModule = await kompleClient.mintModule(contract)
      const executeClient = mintModule.client

      if (!msg) throw Error("msg is undefined")

      switch (executeMsg) {
        case "create_collection":
          return setResponse(
            await executeClient.createCollection({
              codeId: Number(msg.codeId),
              collectionInfo: msg.collectionInfo,
              collectionConfig: msg.collectionConfig,
              tokenInfo: msg.tokenInfo,
              metadataInfo: msg.metadataInfo,
              fundInfo: msg.collectionFundInfo,
              linkedCollections: [],
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
        <title>Execute Mint Module</title>
        <meta property="og:title" content="Execute Mint Module" key="title" />
      </Head>

      <ContractHeader
        title="Mint Module"
        description="Mint Module is used for collection management and token minting."
        documentation={DOC_LINKS.modules.mint}
      />
      <ContractForm
        name="Mint"
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

        <MintModuleExecuteForm executeMsg={executeMsg} onChange={setMsg} />
      </ContractForm>
    </div>
  )
}
