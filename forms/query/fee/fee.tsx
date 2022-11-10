import { TextInput } from "components/TextInput"
import { useState } from "react"

export const Fee = ({ onChange }: { onChange: (msg: any) => void }) => {
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")

  const moduleNameOnChange = (value: string) => {
    setModuleName(value)
    onChange({ module_name: value, fee_name: feeName })
  }

  const feeNameOnChange = (value: string) => {
    setFeeName(value)
    onChange({ module_name: moduleName, fee_name: value })
  }

  return (
    <div>
      <TextInput
        title="Module Name"
        placeholder="marketplace"
        onChange={moduleNameOnChange}
      />
      <TextInput
        title="Fee Name"
        placeholder="owner"
        onChange={feeNameOnChange}
      />
    </div>
  )
}
