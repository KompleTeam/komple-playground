import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import useHubModuleStore from "store/modules/hub"
import { isInteger } from "utils/isInteger"

export const HubModuleRegisterModule = () => {
  const store = useHubModuleStore((state) => state)

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
        onChange={(value) =>
          store.setCodeId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.codeId === 0 ? "" : store.codeId.toString()}
      />
      <TextInput
        title="Module Name"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
      <JsonTextArea title="Register Message" onChange={parseMsg} />
    </div>
  )
}
