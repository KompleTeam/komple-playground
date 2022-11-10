import { useState } from "react"
import { Button } from "../../../components/Button"
import { ContractHeader } from "../../../components/ContractHeader"
import { ContractTabs } from "../../../components/ContractTabs"
import { TextInput } from "../../../components/TextInput"
import { useOfflineSigners, useAccount } from "graz"
import { getSigningClient } from "../../../utils/getSigningClient"
import { JsonViewer } from "../../../components/JsonViewer"
import { ContractForm } from "../../../components/ContractForm"

export default function FeeModuleCreate() {
  const { data: account } = useAccount()
  const { signerAuto } = useOfflineSigners()

  const [codeId, setCodeId] = useState("")
  const [admin, setAdmin] = useState("")
  const [response, setResponse] = useState({})

  const instantiate = async () => {
    const client = await getSigningClient(signerAuto)

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
        description="Fee module is used for defining dadhsahdas dasj dajajh whajdwhjdw dajdahd dwadad."
        documentation="https://docs.komple.io/komple/framework-fundamentals/modules/fee-module"
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
