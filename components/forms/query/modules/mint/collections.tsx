import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleCollections = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Show Blacklisted Collections"
        initialState={store.isBlacklist}
        onChange={store.setIsBlacklist}
      />
      <TextInput
        title="Start After"
        onChange={(value) =>
          store.setStartAfter(isInteger(value) ? Number(value) : 0)
        }
        value={store.startAfter === 0 ? "" : store.startAfter?.toString()}
      />
      <TextInput
        title="Limit"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
