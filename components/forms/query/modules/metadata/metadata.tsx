import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleMetadata = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Token ID"
        subtitle="ID of the NFT to get the metadata of"
        placeholder="6"
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
      />
    </div>
  )
}
