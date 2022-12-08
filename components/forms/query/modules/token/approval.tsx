import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleApproval = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Token ID"
        subtitle="The ID of the token"
        placeholder="17"
        onChange={store.setTokenId}
        isRequired
        value={store.tokenId}
      />
      <TextInput
        title="Operator"
        subtitle="Address of the operator"
        placeholder="juno...."
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
    </div>
  )
}
