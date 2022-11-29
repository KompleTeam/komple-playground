import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useFeeModuleStore } from "store"

export const FeeModuleSetFee = () => {
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
        onChange={feeTypeOnChange}
        placeholder="Select Fee Type"
        isRequired
      />
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
      {store.feeType === "percentage" && (
        <TextInput
          title="Percentage Fee"
          onChange={(value) =>
            store.setPaymentInfo({
              ...store.paymentInfo,
              value,
            })
          }
          isRequired
          value={store.paymentInfo.value}
        />
      )}
      {store.feeType === "fixed" && (
        <TextInput
          title="Fixed Fee"
          onChange={(value) =>
            store.setPaymentInfo({
              ...store.paymentInfo,
              value,
            })
          }
          isRequired
          value={store.paymentInfo.value}
        />
      )}
    </div>
  )
}
