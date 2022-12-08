import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const TokenModuleTokens = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="User Address"
        subtitle="The address of the user"
        placeholder="juno...."
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Pagination - Start After"
        subtitle="Operator address to start after - exclusive"
        placeholder="17"
        onChange={(value) => store.setStartAfter(value !== "" ? value : "")}
        value={store.startAfter?.toString()}
      />
      <TextInput
        title="Pagination - Limit"
        subtitle="Maximum number of operators to return"
        placeholder="20"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
