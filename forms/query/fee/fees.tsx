import { TextInput } from "components/TextInput"
import { useState } from "react"

export const Fees = ({ onChange }: { onChange: (msg: any) => void }) => {
  const [moduleName, setModuleName] = useState("")
  const [startAfter, setStartAfter] = useState("")
  const [limit, setLimit] = useState("")

  const moduleNameOnChange = (value: string) => {
    setModuleName(value)
    onChange({
      module_name: value,
      start_after: startAfter === "" ? null : startAfter,
      limit: limit === "" ? null : startAfter,
    })
  }

  const startAfterOnChange = (value: string) => {
    setStartAfter(value)
    onChange({
      module_name: moduleName,
      start_after: value === "" ? null : value,
      limit: limit === "" ? null : limit,
    })
  }

  const limitOnChange = (value: string) => {
    setLimit(value)
    onChange({
      module_name: moduleName,
      start_after: startAfter === "" ? null : startAfter,
      limit: value === "" ? null : value,
    })
  }

  return (
    <div>
      <TextInput
        title="Module Name"
        placeholder="marketplace"
        onChange={moduleNameOnChange}
        isRequired
      />
      <TextInput
        title="Start After"
        placeholder="owner"
        onChange={startAfterOnChange}
      />
      <TextInput title="Limit" placeholder="owner" onChange={limitOnChange} />
    </div>
  )
}
