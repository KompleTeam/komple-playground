import { TextInput } from "components/TextInput"
import useTokenModuleStore from "store/modules/token"

export const TokenModuleMintedTokensPerAddress = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Address"
        onChange={store.setRecipient}
        isRequired
        value={store.recipient}
      />
    </div>
  )
}
