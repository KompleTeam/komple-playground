import { useState } from "react"
import { Button } from "components/Button"
import { ContractHeader } from "components/ContractHeader"
import { TextInput } from "components/TextInput"
import { useAccount } from "graz"
import { connect } from "utils/wallet"
import { ContractForm } from "components/ContractForm"
import { DOC_LINKS } from "config/docs"

export default function FeeModuleCreate() {
  const { data: account } = useAccount()

  const [codeId, setCodeId] = useState("")
  const [admin, setAdmin] = useState("")
  const [response, setResponse] = useState({})

  const instantiate = async () => {
    const client = await connect()

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

  const disabled = codeId === "" || admin === ""

  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Fee Module"
        description="Fee module is used for general fee adjustment and distribution."
        documentation={DOC_LINKS.modules.fee}
      />
      <ContractForm name="Fee" isModule={true} response={response}>
        <TextInput
          title="Code ID"
          subtitle="Code ID of the contract"
          placeholder="123"
          onChange={setCodeId}
        />
        <TextInput
          title="Admin"
          subtitle="Address of the contract admin"
          placeholder="juno..."
          onChange={setAdmin}
        />
        <Button
          text="Create Fee Module"
          onClick={instantiate}
          disabled={disabled}
        />
      </ContractForm>
    </div>
  )
}
