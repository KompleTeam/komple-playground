import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleRawMetadata = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Metadata ID"
        subtitle="ID of the raw metadata entry"
        placeholder="6"
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
      />
    </div>
  )
}
