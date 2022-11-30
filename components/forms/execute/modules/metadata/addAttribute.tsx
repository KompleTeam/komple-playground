import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleAddAttribute = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Use Raw Metadata"
        initialState={store.rawMetadata}
        onChange={store.setRawMetadata}
      />
      <TextInput
        title={`${store.rawMetadata ? "Metadata ID" : "Token ID"}`}
        subtitle={`ID of the ${
          store.rawMetadata ? "raw metadata entry" : "linked NFT metadata"
        }`}
        placeholder="6"
        onChange={(value) => store.setId(isInteger(value) ? Number(value) : 0)}
        isRequired
        value={store.id === 0 ? "" : store.id.toString()}
      />
      <TextInput
        title="Attribute Name"
        subtitle="Name of the attribute"
        placeholder="eye_color"
        onChange={store.setTraitType}
        value={store.traitType}
      />
      <TextInput
        title="Attribute Value"
        subtitle="Value of the attribute"
        placeholder="red"
        onChange={store.setTraitValue}
        value={store.traitValue}
      />
    </div>
  )
}
