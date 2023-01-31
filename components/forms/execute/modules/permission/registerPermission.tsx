import { Dropdown } from "components/Dropdown"
import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import {
  ATTRIBUTE_PERMISSION_CODE_ID,
  LINK_PERMISSION_CODE_ID,
  OWNERSHIP_PERMISSION_CODE_ID,
} from "config/codeIds"
import { useState } from "react"
import { usePermissionModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const PermissionModuleRegisterPermission = () => {
  const store = usePermissionModuleStore((state) => state)

  const [permission, setPermission] = useState("")

  const parseMsg = (value: string) => {
    try {
      store.setMsg(JSON.parse(value))
    } catch (error: any) {
      store.setMsg(undefined)
    }
  }

  const permissionNameOnChange = (index: number) => {
    let value

    switch (index) {
      case 0:
        value = "attribute"
        store.setCodeId(ATTRIBUTE_PERMISSION_CODE_ID)
        break
      case 1:
        value = "link"
        store.setCodeId(LINK_PERMISSION_CODE_ID)
        break
      case 2:
        value = "ownership"
        store.setCodeId(OWNERSHIP_PERMISSION_CODE_ID)
        break
      case 3:
        value = "custom"
        store.setCodeId(0)
        break
      default:
        value = ""
        break
    }

    setPermission(value)
    store.setPermission(value)
  }

  return (
    <div>
      <Dropdown
        items={["attribute", "link", "ownership", "custom"]}
        title="Permission Name"
        subtitle="Name of the permission to register"
        onChange={permissionNameOnChange}
        placeholder="Select Permission Name"
        isRequired
      />

      {permission === "custom" && (
        <>
          <TextInput
            title="Code ID"
            subtitle="Code ID of permission to register"
            placeholder="10"
            onChange={(value) =>
              store.setCodeId(isInteger(value) ? Number(value) : 0)
            }
            isRequired
            value={store.codeId === 0 ? "" : store.codeId.toString()}
          />
          <TextInput
            title="Custom Permission Name"
            subtitle="Name of permission to register"
            placeholder="attribute"
            onChange={store.setPermission}
            isRequired
            value={store.permission}
          />
          <JsonTextArea
            title="Register Message"
            subtitle="Message to be sent to permission contract"
            onChange={parseMsg}
          />
        </>
      )}
    </div>
  )
}
