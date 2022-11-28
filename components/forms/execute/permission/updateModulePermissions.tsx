import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import usePermissionModuleStore from "store/modules/permission"

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
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
      <TextInputList
        title="Permissions"
        onChange={store.setPermissions}
        value={store.permissions}
      />
    </div>
  )
}
