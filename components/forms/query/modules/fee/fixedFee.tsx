import { TextInput } from "components/TextInput"
import { useFeeModuleStore } from "store"

export const FeeModuleFixedFee = () => {
  const store = useFeeModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module the fee is set for"
        placeholder="marketplace"
        onChange={store.setModuleName}
        isRequired
        value={store.moduleName}
      />
      <TextInput
        title="Fee Name"
        subtitle="Identifier of the fee"
        placeholder="transaction"
        onChange={store.setFeeName}
        isRequired
        value={store.feeName}
      />
    </div>
  )
}
