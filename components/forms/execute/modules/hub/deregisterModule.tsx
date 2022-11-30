import { TextInput } from "components/TextInput"
import { useHubModuleStore } from "store"

export const HubModuleDeregisterModule = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module to deregister"
        placeholder="marketplace"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
    </div>
  )
}
