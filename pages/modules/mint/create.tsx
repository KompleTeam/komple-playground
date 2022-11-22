import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { useWallet } from "@cosmos-kit/react"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { KompleClient } from "komplejs"

export default function MintModuleCreate() {
  const { getSigningCosmWasmClient, offlineSigner, address } = useWallet()

  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("No signing client")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const mintModule = await kompleClient.mintModule("")

      const res = await mintModule.instantiate({
        codeId: parseInt(codeId),
        admin: address,
      })
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
        <></>
      </ContractForm>
    </div>
  )
}
