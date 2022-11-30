import { JsonTextArea } from "components/JsonTextArea"
import { useLinkPermissionStore } from "store"

export const LinkPermissionCheck = () => {
  const store = useLinkPermissionStore((state) => state)

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
