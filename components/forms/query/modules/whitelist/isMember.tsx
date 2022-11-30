import { TextInput } from "components/TextInput"
import { useWhitelistModuleStore } from "store"

export const WhitelistModuleIsMember = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Member Address"
        subtitle="Address of the user to check membership"
        placeholder="juno...."
        onChange={store.setMember}
        isRequired
        value={store.member}
      />
    </div>
  )
}
