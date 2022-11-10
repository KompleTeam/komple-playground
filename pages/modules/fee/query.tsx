import { useState } from "react"
import { Button } from "../../../components/Button"
import { ContractForm } from "../../../components/ContractForm"
import { ContractHeader } from "../../../components/ContractHeader"
import { TextInput } from "../../../components/TextInput"

export default function FeeModuleQuery() {
  const [feeType, setFeeType] = useState("")
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")
  const [data, setData] = useState({})
  const [response, setResponse] = useState({})

  const query = async () => {}

  const disabled = feeType === "" || moduleName === "" || feeName === ""

  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Fee Module"
        description="Fee module is used for defining dadhsahdas dasj dajajh whajdwhjdw dajdahd dwadad."
        documentation="https://docs.komple.io/komple/framework-fundamentals/modules/fee-module"
      />
      <ContractForm name="Fee" isModule={true} response={response}>
        <TextInput
          title="Fee Type"
          subtitle="dasdsa"
          placeholder="juno..."
          onChange={setFeeType}
        />
        <TextInput
          title="Module Name"
          subtitle="Name of the module that will be used"
          placeholder="mint"
          onChange={setModuleName}
        />
        <TextInput
          title="Fee Name"
          subtitle="Name of the fee that will be used as identifier"
          placeholder="price"
          onChange={setFeeName}
        />
        <TextInput
          title="Data"
          subtitle="Data that will determine the fee value and payment address"
          onChange={setData}
        />
        <Button text="Query Fee Module" onClick={query} disabled={disabled} />
      </ContractForm>
    </div>
  )
}
