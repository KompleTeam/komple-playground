import { TextInputList } from "components/TextInputList"
import { useMintModuleStore } from "store"

export const MintModuleUpdateOperators = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Contract Operators"
        subtitle="List of contract operator addresses"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
