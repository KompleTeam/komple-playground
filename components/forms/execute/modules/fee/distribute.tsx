import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { TextMultiInputList } from "components/TextMultiInputList"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useFeeModuleStore } from "store"

export const FeeModuleDistribute = () => {
  const store = useFeeModuleStore((state) => state)

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    store.setFeeType(value)
  }

  const attributeOnChange = (value: Record<string, string>[]) => {
    store.setCustomPaymentAddresses(
      value.map((item) => {
        return { fee_name: item.left, address: item.right }
      })
    )
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
      <TextMultiInputList
        onChange={attributeOnChange}
        titles={["Fee Name", "Custom Address"]}
        placeholder={["transaction", "juno...."]}
      />
    </div>
  )
}
