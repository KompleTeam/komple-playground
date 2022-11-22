import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import useMintModuleStore from "store/modules/mint"
import { isInteger } from "utils/isInteger"

export const MintModuleUpdateLinkedCollections = () => {
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
      <TextInputList
        title="Linked Collections"
        onChange={(value) => store.setLinkedCollections(value)}
        value={store.linkedCollections}
      />
    </div>
  )
}
