import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import { usePermissionModuleStore } from "store"

export const PermissionModuleCheck = () => {
  const store = usePermissionModuleStore((state) => state)

  const parseMsg = (value: string) => {
    try {
      store.setMsg(JSON.parse(value))
    } catch (error: any) {
      store.setMsg(undefined)
    }
  }

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module to check permission for"
        placeholder="marketplace"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
      <JsonTextArea
        title="Permission Check Message"
        subtitle="List of permission check messages"
        onChange={parseMsg}
        isRequired
      />
    </div>
  )
}
