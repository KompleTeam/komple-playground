import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { useAttributePermissionStore } from "store"
import { AttributePermissionCheck } from "components/forms/execute"

const EXECUTES = ["check"]

export default function AttributePermissionExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useAttributePermissionStore((state) => state)

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
      const attributePermission = await kompleClient.attributePermission(
        contract
      )
      const client = attributePermission.client

      switch (executeMsg) {
        case "check": {
          const msg = {
            data: store.data === undefined ? "" : toBinary(store.data),
          }

          return setResponse(await client.check(msg))
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
        <title>Attribute Permission | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Attribute Permission | Komple Framework Playground"
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

        {executeMsg === "check" && <AttributePermissionCheck />}
      </ContractForm>
    </div>
  )
}