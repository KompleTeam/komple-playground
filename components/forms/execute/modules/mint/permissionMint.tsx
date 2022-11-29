import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModulePermissionMint = () => {
  const store = useMintModuleStore((state) => state)

  const parseMsg = (value: string) => {
    try {
      store.setPermissionMsg(JSON.parse(value))
    } catch (error: any) {
      store.setPermissionMsg({})
    }
  }

  return (
    <div>
      <JsonTextArea title="Permission Message" onChange={parseMsg} />
      <TextInput
        title="Collection ID"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Recipient"
        onChange={(value) => store.setRecipient(value)}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Metadata ID"
        onChange={(value) =>
          store.setMetadataId(isInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
    </div>
  )
}
