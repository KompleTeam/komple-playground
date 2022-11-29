import { TextInput } from "components/TextInput"
import { useFeeModuleStore } from "store"

export const FeeModulePercentageFee = () => {
  const store = useFeeModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        onChange={store.setModuleName}
        isRequired
        value={store.moduleName}
      />
      <TextInput
        title="Fee Name"
        onChange={store.setFeeName}
        isRequired
        value={store.feeName}
      />
    </div>
  )
}
