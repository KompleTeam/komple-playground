import { TextInput } from "components/TextInput"
import { useFeeModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const FeeModuleTotalPercentageFees = () => {
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
