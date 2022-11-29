import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useFeeModuleStore } from "store"

export const FeeModuleRemoveFee = () => {
  const store = useFeeModuleStore((state) => state)

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    store.setFeeType(value)
  }

  return (
    <div>
      <Dropdown
        items={["percentage", "fixed"]}
        title="Fee Type"
        subtitle="Type of fee"
        onChange={feeTypeOnChange}
        placeholder="Select Fee Type"
        isRequired
      />
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
