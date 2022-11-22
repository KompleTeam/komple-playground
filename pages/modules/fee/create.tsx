import { useEffect, useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useSigningClients, useOfflineSigners } from "graz"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { KompleClient } from "komplejs"
import { useFeeModuleStore } from "store"
import { useWallet } from "@cosmos-kit/react"

export default function FeeModuleCreate() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useFeeModuleStore((state) => state)

  const [response, setResponse] = useState({})

  useEffect(() => {
    store.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async ({ codeId }: { codeId: string }) => {
    const signingClient = await getSigningCosmWasmClient()
    if (signingClient === undefined || offlineSigner === undefined) {
      throw new Error("No signing client")
    }

    const kompleClient = new KompleClient(signingClient, offlineSigner)
    const feeModule = await kompleClient.feeModule("")

    const res = await feeModule.instantiate({
      codeId: parseInt(codeId),
      admin: store.admin,
    })
    setResponse(res)
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Create Fee Module</title>
        <meta property="og:title" content="Create Fee Module" key="title" />
      </Head>

      <ContractHeader
        title="Fee Module"
        description="Fee module is used for general fee adjustment and distribution in Komple Framework."
        documentation={DOC_LINKS.modules.fee}
      />
      <ContractForm
        name="Fee"
        isModule={true}
        response={response}
        action="create"
        submit={submit}
      >
        <TextInput
          title="Admin"
          subtitle="Address of the contract admin"
          placeholder="juno..."
          onChange={store.setAdmin}
          isRequired
          value={store.admin}
        />
      </ContractForm>
    </div>
  )
}
