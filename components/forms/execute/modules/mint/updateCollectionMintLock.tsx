import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleUpdateCollectionMintLock = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        subtitle="The ID of the collection to lock"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <Switch
        title="Mint Lock"
        subtitle="Enable or disable minting for this collection"
        initialState={store.lock}
        onChange={store.setLock}
      />
    </div>
  )
}
