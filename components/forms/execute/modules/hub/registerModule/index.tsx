import { Dropdown } from "components/Dropdown"
import { JsonTextArea } from "components/JsonTextArea"
import { Seperator } from "components/Seperator"
import { TextInput } from "components/TextInput"
import {
  FEE_MODULE_CODE_ID,
  MARKETPLACE_MODULE_CODE_ID,
  MERGE_MODULE_CODE_ID,
  MINT_MODULE_CODE_ID,
  PERMISSION_MODULE_CODE_ID,
} from "config/codeIds"
import { useState } from "react"
import { useHubModuleStore } from "store"
import { isInteger } from "utils/isInteger"

import { HubModuleRegisterModuleMarketplace } from "./marketplace"

export const HubModuleRegisterModule = () => {
  const store = useHubModuleStore((state) => state)

  const [module, setModule] = useState("")

  const parseMsg = (value: string) => {
    try {
      store.setMsg(JSON.parse(value))
    } catch (error: any) {
      store.setMsg(undefined)
    }
  }

  const moduleNameOnChange = (index: number) => {
    let value

    switch (index) {
      case 0:
        value = "fee"
        store.setCodeId(FEE_MODULE_CODE_ID)
        break
      case 1:
        value = "marketplace"
        store.setCodeId(MARKETPLACE_MODULE_CODE_ID)
        break
      case 2:
        value = "merge"
        store.setCodeId(MERGE_MODULE_CODE_ID)
        break
      case 3:
        value = "mint"
        store.setCodeId(MINT_MODULE_CODE_ID)
        break
      case 4:
        value = "permission"
        store.setCodeId(PERMISSION_MODULE_CODE_ID)
        break
      case 5:
        value = "custom"
        store.setCodeId(0)
        break
      default:
        value = ""
        break
    }

    setModule(value)
    store.setModule(value)
  }

  return (
    <div>
      <Dropdown
        items={["fee", "marketplace", "merge", "mint", "permission", "custom"]}
        title="Module Name"
        subtitle="Name of the module to register"
        onChange={moduleNameOnChange}
        placeholder="Select Module Name"
        isRequired
      />

      {module === "custom" && (
        <>
          <TextInput
            title="Code ID"
            subtitle="Code ID of module to register"
            placeholder="10"
            onChange={(value) =>
              store.setCodeId(isInteger(value) ? Number(value) : 0)
            }
            isRequired
            value={store.codeId === 0 ? "" : store.codeId.toString()}
          />
          <TextInput
            title="Custom Module Name"
            subtitle="Name of module to register"
            placeholder="marketplace"
            onChange={store.setModule}
            isRequired
            value={store.module}
          />
          <JsonTextArea
            title="Register Message"
            onChange={parseMsg}
            placeholder={`{
          "fund_info": {
            "is_native": true,
            "denom": "ujunox"
          }
}`}
          />
        </>
      )}

      {module === "marketplace" && (
        <>
          <Seperator text="Marketplace Currency Info" />
          <HubModuleRegisterModuleMarketplace />
        </>
      )}
    </div>
  )
}
