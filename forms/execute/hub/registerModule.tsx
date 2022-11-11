import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { TextInput } from "components/TextInput"
import { useState } from "react"

export const HubExecuteRegisterModule = ({
  onChange,
}: {
  onChange: (msg: any) => void
}) => {
  const [codeId, setCodeId] = useState("")
  const [moduleName, setModuleName] = useState("")
  const [msg, setMsg] = useState("")

  const codeIdOnChange = (value: string) => {
    setCodeId(value)
    onChange({
      code_id: Number(value),
      module: moduleName,
      msg: msg === "" ? undefined : toBinary(msg),
    })
  }

  const moduleNameOnChange = (value: string) => {
    setModuleName(value)
    onChange({
      code_id: Number(codeId),
      module: value,
      msg: msg === "" ? undefined : toBinary(msg),
    })
  }

  const msgOnChange = (value: string) => {
    setMsg(value)
    onChange({
      code_id: Number(codeId),
      module: moduleName,
      msg: value === "" ? undefined : toBinary(JSON.parse(value)),
    })
  }

  return (
    <div>
      <TextInput
        title="Code ID"
        subtitle="Code ID of the contract to register"
        onChange={codeIdOnChange}
        isRequired
      />
      <TextInput
        title="Module Name"
        placeholder="mint"
        onChange={moduleNameOnChange}
        isRequired
      />
      <TextInput
        title="data"
        placeholder="{name: 'xxx'}"
        onChange={msgOnChange}
      />
    </div>
  )
}
