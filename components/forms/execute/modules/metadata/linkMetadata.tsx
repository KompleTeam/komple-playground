import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleLinkMetadata = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Token ID"
        subtitle="ID of the NFT to link the metadata to"
        placeholder="6"
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
      />
      <TextInput
        title="Metadata ID"
        subtitle="ID of the metadata to link to the NFT"
        placeholder="17"
        onChange={(value) =>
          store.setMetadataId(isInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
    </div>
  )
}
