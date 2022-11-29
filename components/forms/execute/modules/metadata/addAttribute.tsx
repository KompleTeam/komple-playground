import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleAddAttribute = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Raw Metadata"
        initialState={store.rawMetadata}
        onChange={store.setRawMetadata}
      />
      <TextInput
        title={`${store.rawMetadata ? "Metadata ID" : "Token ID"}`}
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
      />
      <TextInput
        title="Trait Type"
        onChange={store.setTraitType}
        value={store.traitType}
      />
      <TextInput
        title="Trait Value"
        onChange={store.setTraitValue}
        value={store.traitValue}
      />
    </div>
  )
}
