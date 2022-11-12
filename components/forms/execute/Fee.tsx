import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { Fees } from "komplejs/lib/cjs/types/framework/FeeModule.types"
import { useEffect, useState } from "react"

export type FeeModuleExecuteType =
  | ""
  | "set_fee"
  | "remove_fee"
  | "distribute"
  | "lock_execute"

export interface FeeModuleExecuteFormMsg {
  feeType: Fees
  moduleName: string
  feeName: string
  feeValue: string
  paymentAddress: string
}

export interface FeeModuleExecuteInterface {
  executeMsg: FeeModuleExecuteType
  onChange: (msg: FeeModuleExecuteFormMsg) => void
}

export const FeeModuleExecuteForm = ({
  executeMsg,
  onChange,
}: FeeModuleExecuteInterface) => {
  const [feeType, setFeeType] = useState<Fees>("percentage")
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")
  const [feeValue, setFeeValue] = useState("")
  const [paymentAddress, setPaymentAddress] = useState("")

  useEffect(() => {
    onChange({
      feeType,
      moduleName,
      feeName,
      feeValue,
      paymentAddress,
    })
  }, [onChange, feeType, moduleName, feeName, feeValue, paymentAddress])

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    setFeeType(value)
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
          <TextInput title="Module Name" onChange={setModuleName} isRequired />
          <TextInput title="Fee Name" onChange={setFeeName} isRequired />
        </>
      )}

      {executeMsg === "set_fee" && (
        <>
          {feeType === "percentage" && (
            <TextInput
              title="Percentage Fee"
              onChange={setFeeValue}
              isRequired
            />
          )}
          {feeType === "fixed" && (
            <TextInput title="Fixed Fee" onChange={setFeeValue} isRequired />
          )}
          <TextInput
            title="Payment Address"
            placeholder="juno..."
            onChange={setPaymentAddress}
          />
        </>
      )}

      {/* {executeMsg === "distribute" && (
        <TextInputList
          title="Payment Addresses"
          onChange={() => {}}
          placeholder="juno1..."
        />
      )} */}
    </div>
  )
}
