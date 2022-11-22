import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useFeeModuleStore } from "store"

export type FeeModuleQueryType =
  | ""
  | "config"
  | "percentage_fee"
  | "fixed_fee"
  | "percentage_fees"
  | "fixed_fees"
  | "total_percentage_fees"
  | "total_fixed_fees"
  | "keys"
export interface FeeModuleQueryInterface {
  query: FeeModuleQueryType
}

export const FeeModuleQueryForm = ({ query }: FeeModuleQueryInterface) => {
  const store = useFeeModuleStore((state) => state)

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    store.setFeeType(value)
  }

  return (
    <div>
      {query === "keys" && (
        <Dropdown
          items={["percentage", "fixed"]}
          title="Fee Type"
          onChange={feeTypeOnChange}
          placeholder="Select Fee Type"
        />
      )}

      {(query === "percentage_fee" ||
        query === "fixed_fee" ||
        query === "fixed_fees" ||
        query === "percentage_fees" ||
        query === "total_percentage_fees" ||
        query === "total_fixed_fees") && (
        <TextInput
          title="Module Name"
          onChange={store.setModuleName}
          isRequired
          value={store.moduleName}
        />
      )}

      {(query === "percentage_fee" || query === "fixed_fee") && (
        <TextInput
          title="Fee Name"
          onChange={store.setFeeName}
          value={store.feeName}
        />
      )}

      {(query === "fixed_fees" ||
        query === "percentage_fees" ||
        query === "total_percentage_fees" ||
        query === "total_fixed_fees") && (
        <>
          <TextInput
            title="Start After"
            onChange={store.setStartAfter}
            value={store.startAfter}
          />
          <TextInput
            title="Limit"
            onChange={store.setLimit}
            value={store.limit}
          />
        </>
      )}
    </div>
  )
}
