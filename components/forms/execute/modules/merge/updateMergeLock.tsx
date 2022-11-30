import { Switch } from "components/Switch"
import { useMergeModuleStore } from "store"

export const MergeModuleUpdateMergeLock = () => {
  const store = useMergeModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Merge Lock"
        subtitle="Enable or disable merge lock"
        initialState={store.lock}
        onChange={store.setLock}
      />
    </div>
  )
}
