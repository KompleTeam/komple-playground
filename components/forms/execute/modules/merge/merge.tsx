import { TextInput } from "components/TextInput"
import { TextMultiInputList } from "components/TextMultiInputList"
import { useMergeModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MergeModuleMerge = () => {
  const store = useMergeModuleStore((state) => state)

  const burnIdsOnChange = (value: Record<string, string>[]) => {
    store.setBurnIds(
      value.map((item) => {
        return {
          collection_id: isInteger(item.left) ? Number(item.left) : 0,
          token_id: isInteger(item.right) ? Number(item.right) : 0,
        }
      })
    )
  }

  return (
    <div>
      <TextInput
        title="Recipient"
        onChange={(value) => store.setRecipient(value)}
        isRequired
        value={store.recipient}
      />
      <TextInput
        title="Collection ID for Mint"
        onChange={(value) =>
          store.setMintId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.mintId === 0 ? "" : store.mintId.toString()}
      />
      <TextInput
        title="Metadata ID for Mint"
        onChange={(value) =>
          store.setMetadataId(isInteger(value) ? Number(value) : 0)
        }
        value={store.metadataId === 0 ? "" : store.metadataId?.toString()}
      />
      <TextMultiInputList
        onChange={burnIdsOnChange}
        titles={["Collection ID", "Token ID"]}
      />
    </div>
  )
}
