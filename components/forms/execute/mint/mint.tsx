import { TextInput } from "components/TextInput"
import useMintModuleStore from "store/modules/mint"
import { isPositiveInteger } from "utils/isInteger"

export const MintModuleMint = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        onChange={(value) =>
          store.setCollectionId(isPositiveInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Metadata ID"
        onChange={(value) =>
          store.setMetadataId(isPositiveInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
    </div>
  )
}
