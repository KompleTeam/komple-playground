import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleOwnerOf = () => {
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
    </div>
  )
}
