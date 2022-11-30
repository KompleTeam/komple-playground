import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleAdminMint = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Recipient"
        subtitle="Address of the recipient to mint"
        placeholder="juno...."
        onChange={(value) => store.setRecipient(value)}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Collection ID"
        subtitle="The ID of the collection to mint"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Metadata ID"
        subtitle="The ID of the metadata to mint"
        placeholder="17"
        onChange={(value) =>
          store.setMetadataId(isInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
    </div>
  )
}
