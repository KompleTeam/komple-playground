import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { useState } from "react"

export const RemoveFee = ({ onChange }: { onChange: (msg: any) => void }) => {
  const [feeType, setFeeType] = useState("")
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")

  const feeTypeOnChange = (index: number) => {
    let value = index === 0 ? "percentage" : "fixed"
    setFeeType(value)
    onChange({
      fee_type: value,
      module_name: moduleName,
      fee_name: feeName,
    })
  }

  const moduleNameOnChange = (value: string) => {
    setModuleName(value)
    onChange({
      fee_type: feeType,
      module_name: value,
      fee_name: feeName,
    })
  }

  const feeNameOnChange = (value: string) => {
    setFeeName(value)
    onChange({
      fee_type: feeType,
      module_name: moduleName,
      fee_name: value,
    })
  }

  return (
    <div>
      <Dropdown
        items={["percentage", "fixed"]}
        title="Fee Type"
        onChange={feeTypeOnChange}
        placeholder="Select Fee Type"
      />
      <TextInput
        title="Module Name"
        placeholder="marketplace"
        onChange={moduleNameOnChange}
        isRequired
      />
      <TextInput
        title="Fee Name"
        placeholder="owner"
        onChange={feeNameOnChange}
        isRequired
      />
    </div>
  )
}
