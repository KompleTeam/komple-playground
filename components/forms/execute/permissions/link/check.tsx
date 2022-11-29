import { JsonTextArea } from "components/JsonTextArea"
import useLinkPermissionStore from "store/permissions/link"

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
      <JsonTextArea title="Permission Check Message" onChange={parseMsg} />
    </div>
  )
}
