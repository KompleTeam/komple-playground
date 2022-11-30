import { TextInputList } from "components/TextInputList"
import { useMetadataModuleStore } from "store"

export const MetadataModuleUpdateOperators = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Contract Operators"
        subtitle="List of contract operators"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
