import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import { usePermissionModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const PermissionModuleRegisterPermission = () => {
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
        title="Code ID"
        subtitle="Code ID of permission to register"
        placeholder="10"
        onChange={(value) =>
          store.setCodeId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.codeId === 0 ? "" : store.codeId.toString()}
      />
      <TextInput
        title="Permission Name"
        subtitle="Name of permission to register"
        placeholder="attribute"
        onChange={store.setPermission}
        isRequired
        value={store.permission}
      />
      <JsonTextArea
        title="Register Message"
        subtitle="Message to be sent to permission contract"
        onChange={parseMsg}
      />
    </div>
  )
}
