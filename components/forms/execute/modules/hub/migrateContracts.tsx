import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import useHubModuleStore from "store/modules/hub"
import { isInteger } from "utils/isInteger"

export const HubModuleMigrateContracts = () => {
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
        title="Contract Address"
        onChange={store.setContractAddress}
        isRequired
        value={store.contractAddress}
      />
      <JsonTextArea title="Migration Message" onChange={parseMsg} />
    </div>
  )
}
