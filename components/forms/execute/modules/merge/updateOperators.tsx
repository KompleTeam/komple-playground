import { TextInputList } from "components/TextInputList"
import { useMergeModuleStore } from "store"

export const MergeModuleUpdateOperators = () => {
  const store = useMergeModuleStore((state) => state)

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
