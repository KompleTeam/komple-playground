import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import useFeeModuleStore from "store/modules/fee"

export type FeeModuleExecuteType =
  | ""
  | "set_fee"
  | "remove_fee"
  | "distribute"
  | "lock_execute"

export interface FeeModuleExecuteInterface {
  executeMsg: FeeModuleExecuteType
}

export const FeeModuleExecuteForm = ({
  executeMsg,
}: FeeModuleExecuteInterface) => {
  const store = useFeeModuleStore((state) => state)

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    store.setFeeType(value)
  }

  return (
    <div>
      {(executeMsg === "set_fee" ||
        executeMsg === "remove_fee" ||
        executeMsg === "distribute") && (
        <>
          <Dropdown
            items={["percentage", "fixed"]}
            title="Fee Type"
            onChange={feeTypeOnChange}
            placeholder="Select Fee Type"
            isRequired
          />
          <TextInput
            title="Module Name"
            onChange={store.setModuleName}
            isRequired
            value={store.moduleName}
          />
          <TextInput
            title="Fee Name"
            onChange={store.setFeeName}
            isRequired
            value={store.feeName}
          />
        </>
      )}

      {executeMsg === "set_fee" && (
        <>
          {store.feeType === "percentage" && (
            <TextInput
              title="Percentage Fee"
              onChange={(value) =>
                store.setPaymentInfo({
                  ...store.paymentInfo,
                  value,
                })
              }
              isRequired
              value={store.paymentInfo.value}
            />
          )}
          {store.feeType === "fixed" && (
            <TextInput
              title="Fixed Fee"
              onChange={(value) =>
                store.setPaymentInfo({
                  ...store.paymentInfo,
                  value,
                })
              }
              isRequired
              value={store.paymentInfo.value}
            />
          )}
          <TextInput
            title="Payment Address"
            placeholder="juno..."
            onChange={(address) =>
              store.setPaymentInfo({
                ...store.paymentInfo,
                address,
              })
            }
            value={store.paymentInfo.address}
          />
        </>
      )}

      {executeMsg === "distribute" && (
        <TextInputList
          title="Payment Addresses"
          onChange={() => {}}
          placeholder="juno1..."
        />
      )}
    </div>
  )
}
