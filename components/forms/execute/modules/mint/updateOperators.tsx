import { TextInputList } from "components/TextInputList"
import { useMintModuleStore } from "store"

export const MintModuleUpdateOperators = () => {
  const store = useMintModuleStore((state) => state)

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
