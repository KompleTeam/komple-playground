import { TextInputList } from "components/TextInputList"
import { useWhitelistModuleStore } from "store"

export const WhitelistModuleRemoveMembers = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Remove Members"
        onChange={store.setMembers}
        value={store.members}
        isRequired
      />
    </div>
  )
}
