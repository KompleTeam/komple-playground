import { Switch } from "components/Switch"
import { useMintModuleStore } from "store"

export const MintModuleUpdatePublicCollectionCreation = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Public Collection Creation"
        subtitle="Enable or disable public collection creation"
        initialState={store.lock}
        onChange={store.setPublicCollectionCreation}
      />
    </div>
  )
}
