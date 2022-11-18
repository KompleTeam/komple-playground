import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useAccount } from "graz"
import { connect } from "utils/wallet"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"

export default function MintModuleCreate() {
  const { data: account } = useAccount()

  const [admin, setAdmin] = useState("")
  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: string }) => {
    try {
      const client = await connect()
      const res = await client.instantiate(
        account?.bech32Address || "",
        parseInt(codeId),
        {
          admin,
        },
        "Komple Mint Module",
        "auto",
        { admin: account?.bech32Address }
      )

      setResponse(res)
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Create Mint Module</title>
        <meta property="og:title" content="Create Mint Module" key="title" />
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
