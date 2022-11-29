import { TextInput } from "components/TextInput"
import { useWhitelistModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const WhitelistModuleMembers = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Start After"
        onChange={store.setStartAfter}
        isRequired
        value={store.startAfter}
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
