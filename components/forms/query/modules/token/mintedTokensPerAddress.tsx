import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleMintedTokensPerAddress = () => {
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
    </div>
  )
}
