import { JsonTextArea } from "components/JsonTextArea"
import { useOwnershipPermissionStore } from "store"

export const OwnershipPermissionCheck = () => {
  const store = useOwnershipPermissionStore((state) => state)

  const parseMsg = (value: string) => {
    try {
      store.setData(JSON.parse(value))
    } catch (error: any) {
      store.setData(undefined)
    }
  }

  return (
    <div>
      <JsonTextArea
        title="Permission Check Message"
        subtitle="List of permission check messages"
        onChange={parseMsg}
      />
    </div>
  )
}
