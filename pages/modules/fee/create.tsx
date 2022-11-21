import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useSigningClients, useOfflineSigners } from "graz"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { KompleClient } from "komplejs"

export default function FeeModuleCreate() {
  const { data: signingClients } = useSigningClients()
  const { signerAuto } = useOfflineSigners()

  const [admin, setAdmin] = useState("")
  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: string }) => {
    if (signingClients?.cosmWasm === undefined || signerAuto === null) {
      throw new Error("No signing client")
    }

    const kompleClient = new KompleClient(signingClients.cosmWasm, signerAuto)
    const feeModule = await kompleClient.feeModule("")

    const res = await feeModule.instantiate({
      codeId: parseInt(codeId),
      admin,
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
          onChange={setAdmin}
          isRequired
        />
      </ContractForm>
    </div>
  )
}
