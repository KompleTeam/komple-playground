import { TextInput } from "components/TextInput"
import { useHubModuleStore } from "store"

export const HubModuleModuleAddress = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module to resolve address for"
        placeholder="marketplace"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
    </div>
  )
}
