import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleAdminTransferNFT = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Recipient"
        subtitle="The address of the recipient"
        placeholder="juno...."
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Token ID"
        subtitle="The ID of the token"
        placeholder="17"
        onChange={store.setTokenId}
        isRequired
        value={store.tokenId}
      />
    </div>
  )
}
