import { TextInput } from "components/TextInput"
import { usePermissionModuleStore } from "store"

export const PermissionModulePermissionAddress = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Permission Name"
        subtitle="Name of permission to resolve address for"
        placeholder="attribute"
        onChange={store.setPermission}
        isRequired
        value={store.permission}
      />
    </div>
  )
}
