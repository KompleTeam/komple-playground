import { TextInput } from "components/TextInput"
import usePermissionModuleStore from "store/modules/permission"

export const PermissionModuleModulePermissions = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
    </div>
  )
}
