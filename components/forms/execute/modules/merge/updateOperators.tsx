import { TextInputList } from "components/TextInputList"
import { useMergeModuleStore } from "store"

export const MergeModuleUpdateOperators = () => {
  const store = useMergeModuleStore((state) => state)

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
