import { TextInputList } from "components/TextInputList"
import { useWhitelistModuleStore } from "store"

export const WhitelistModuleAddMembers = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Member List"
        subtitle="List of addresses"
        placeholder="juno...."
        onChange={store.setMembers}
        value={store.members}
        isRequired
      />
    </div>
  )
}
