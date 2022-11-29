import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleSendNFT = () => {
  const store = useTokenModuleStore((state) => state)

  const parseMsg = (value: string) => {
    try {
      store.setSendMsg(JSON.parse(value))
    } catch (error: any) {
      store.setSendMsg({})
    }
  }

  return (
    <div>
      <TextInput
        title="Contract"
        onChange={store.setContract}
        isRequired
        value={store.contract}
      />
      <TextInput
        title="Token ID"
        onChange={store.setTokenId}
        isRequired
        value={store.tokenId}
      />
      <JsonTextArea title="Send Message" onChange={parseMsg} isRequired />
    </div>
  )
}
