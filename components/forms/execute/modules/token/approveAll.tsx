import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleApproveAll = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Operator Address"
        subtitle="The address of the operator"
        placeholder="juno...."
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
    </div>
  )
}
