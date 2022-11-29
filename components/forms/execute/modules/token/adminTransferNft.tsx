import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleAdminTransferNFT = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Recipient"
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
