import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleCollectionInfo = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        subtitle="The ID of the collection"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
    </div>
  )
}
