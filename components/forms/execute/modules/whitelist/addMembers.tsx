import { TextInputList } from "components/TextInputList"
import { useWhitelistModuleStore } from "store"

export const WhitelistModuleAddMembers = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Add Members"
        onChange={store.setMembers}
        value={store.members}
        isRequired
      />
    </div>
  )
}
