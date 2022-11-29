import { TextInput } from "components/TextInput"
import useWhitelistModuleStore from "store/modules/whitelist"

export const WhitelistModuleIsMember = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Member"
        onChange={store.setMember}
        isRequired
        value={store.member}
      />
    </div>
  )
}
