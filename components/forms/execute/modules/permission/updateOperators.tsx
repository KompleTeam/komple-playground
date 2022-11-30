import { TextInputList } from "components/TextInputList"
import { usePermissionModuleStore } from "store"

export const PermissionModuleUpdateOperators = () => {
  const store = usePermissionModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Contract Operators"
        subtitle="List of contract operators"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
