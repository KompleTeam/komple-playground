import { TextInput } from "components/TextInput"
import { useEffect, useState } from "react"

export type HubModuleQueryType = "" | "config" | "module_address" | "operators"

export interface HubModuleQueryFormMsg {
  module: string
}

export interface HubModuleQueryInterface {
  query: HubModuleQueryType
  onChange: (msg: HubModuleQueryFormMsg) => void
}

export const HubModuleQueryForm = ({
  query,
  onChange,
}: HubModuleQueryInterface) => {
  const [module, setModule] = useState("")

  useEffect(() => {
    onChange({
      module,
    })
  }, [onChange, module])

  return (
    <div>
      {query === "module_address" && (
        <TextInput title="Module Name" onChange={setModule} isRequired />
      )}
    </div>
  )
}
