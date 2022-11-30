import { TextInputList } from "components/TextInputList"
import { useTokenModuleStore } from "store"

export const TokenModuleUpdateModuleOperators = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Operator Addresses"
        subtitle="List of operator addresses"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
