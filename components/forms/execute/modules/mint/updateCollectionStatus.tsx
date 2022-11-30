import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleUpdateCollectionStatus = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        subtitle="The ID of the collection to update the blacklist status"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <Switch
        title="Blacklist Collection"
        subtitle="Set or unset the blacklist status of the collection"
        initialState={store.isBlacklist}
        onChange={store.setIsBlacklist}
      />
    </div>
  )
}
