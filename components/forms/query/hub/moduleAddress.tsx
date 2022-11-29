import { TextInput } from "components/TextInput"
import useHubModuleStore from "store/modules/hub"

export const HubModuleModuleAddress = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
    </div>
  )
}
