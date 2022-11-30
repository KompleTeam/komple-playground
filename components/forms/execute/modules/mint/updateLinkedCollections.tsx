import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleUpdateLinkedCollections = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        subtitle="The ID of the collection to update linked collections"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInputList
        title="Linked Collections"
        subtitle="The IDs of the collections to link to the collection"
        placeholder="6"
        onChange={(value) => store.setLinkedCollections(value)}
        value={store.linkedCollections}
      />
    </div>
  )
}
