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
        subtitle="Enable or disable showing blacklisted collections"
        initialState={store.isBlacklist}
        onChange={store.setIsBlacklist}
      />
      <TextInput
        title="Pagination - Start After"
        subtitle="Collection ID to start after - exclusive"
        placeholder="3"
        onChange={(value) =>
          store.setStartAfter(isInteger(value) ? Number(value) : 0)
        }
        value={store.startAfter === 0 ? "" : store.startAfter?.toString()}
      />
      <TextInput
        title="Pagination - Limit"
        subtitle="Maximum number of listings to return"
        placeholder="20"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
