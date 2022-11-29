import { TextInput } from "components/TextInput"
import useMetadataModuleStore from "store/modules/metadata"
import { isInteger } from "utils/isInteger"

export const MetadataModuleLinkMetadata = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Token ID"
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
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
