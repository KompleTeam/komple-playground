import { TextInput } from "components/TextInput"
import { usePermissionModuleStore } from "store"

export const PermissionModuleModulePermissions = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Module Name"
        subtitle="Name of module to list permissions"
        placeholder="marketplace"
        onChange={store.setModule}
        isRequired
        value={store.module}
      />
    </div>
  )
}
