import { TextInputList } from "components/TextInputList"
import useMetadataModuleStore from "store/modules/metadata"

export const MetadataModuleUpdateOperators = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Operators"
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
