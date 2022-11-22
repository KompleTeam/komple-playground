import { TextInput } from "components/TextInput"
import useMintModuleStore from "store/modules/mint"
import { isInteger } from "utils/isInteger"

export const MintModuleAdminMint = () => {
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
      <TextInput
        title="Recipient"
        onChange={(value) => store.setRecipient(value)}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Metadata ID"
        onChange={(value) =>
          store.setMetadataId(isInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
    </div>
  )
}
