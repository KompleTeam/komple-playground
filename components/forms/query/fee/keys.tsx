import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useFeeModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const FeeModuleKeys = () => {
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
        title="Start After"
        onChange={(value) => store.setStartAfter(value !== "" ? value : "")}
        isRequired
        value={store.startAfter?.toString()}
      />
      <TextInput
        title="Limit"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
