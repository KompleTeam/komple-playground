import { TextInput } from "components/TextInput"
import { useFeeModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const FeeModuleFixedFees = () => {
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
        title="Pagination - Start After"
        subtitle="Fee name to start after - exclusive"
        placeholder="transaction"
        onChange={(value) => store.setStartAfter(value !== "" ? value : "")}
        value={store.startAfter?.toString()}
      />
      <TextInput
        title="Pagination - Limit"
        subtitle="Maximum number of fees to return"
        placeholder="20"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
