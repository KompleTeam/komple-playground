import { TextInput } from "components/TextInput"
import useTokenModuleStore from "store/modules/token"

export const TokenModuleApprove = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Operator"
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Token ID"
        onChange={store.setTokenId}
        isRequired
        value={store.tokenId}
      />
    </div>
  )
}
