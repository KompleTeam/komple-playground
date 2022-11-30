import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { usePermissionModuleStore } from "store"

export const PermissionModuleUpdateModulePermissions = () => {
  const store = usePermissionModuleStore((state) => state)

  const parseMsg = (value: string) => {
    try {
      store.setMsg(JSON.parse(value))
    } catch (error: any) {
      store.setMsg(undefined)
    }
  }

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module to update permissions for"
        placeholder="marketplace"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
      <TextInputList
        title="Permissions"
        subtitle="List of permissions to update"
        placeholder="attribute"
        onChange={store.setPermissions}
        value={store.permissions}
      />
    </div>
  )
}
