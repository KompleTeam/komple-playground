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
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <Switch
        title="Lock Minting"
        initialState={store.lock}
        onChange={store.setLock}
      />
    </div>
  )
}
