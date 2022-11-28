import { TextInput } from "components/TextInput"
import usePermissionModuleStore from "store/modules/permission"

export const PermissionModulePermissionAddress = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Permission Name"
        onChange={store.setPermission}
        isRequired
        value={store.permission}
      />
    </div>
  )
}
