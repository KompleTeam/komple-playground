import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useAccount } from "graz"
import { getKeplrSigner, getSigningClient } from "utils/wallet"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"

export default function FeeModuleCreate() {
  const { data: account } = useAccount()

  const [admin, setAdmin] = useState("")
  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: string }) => {
    const signer = await getKeplrSigner()
    const client = await getSigningClient(signer)

    const res = await client.instantiate(
      account?.bech32Address || "",
      parseInt(codeId),
      {
        admin,
      },
      "Komple Fee Module",
      "auto",
      { admin: account?.bech32Address }
    )

    setResponse(res)
  }

  return (
    <div className="h-full w-full">
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
