import { TextInputList } from "components/TextInputList"
import usePermissionModuleStore from "store/modules/permission"

export const PermissionModuleUpdateOperators = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Operators"
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
