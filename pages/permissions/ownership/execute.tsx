import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { OwnershipPermissionCheck } from "components/forms/execute"
import { useAppStore, useOwnershipPermissionStore } from "store"

const EXECUTES = ["check_permission"]

export default function OwnershipPermissionExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useOwnershipPermissionStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const ownershipPermission = await kompleClient.ownershipPermission(
        contract
      )
      const client = ownershipPermission.client

      switch (executeMsg) {
        case "check_permission": {
          const msg = {
            data: store.data === undefined ? "" : toBinary(store.data),
          }

          return setResponse(await client.check(msg))
        }
      }

      setLoading(false)
    } catch (error: any) {
      setResponse(error.message)
      setLoading(false)
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
        description="Ownership Permission is used to check the ownership of an user for a token."
        documentation={DOC_LINKS.permissions.ownership}
      />
      <ContractForm
        name="Ownership"
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

        {executeMsg === "check_permission" && <OwnershipPermissionCheck />}
      </ContractForm>
    </div>
  )
}
