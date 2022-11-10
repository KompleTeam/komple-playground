import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { useState } from "react"

export const SetFee = ({ onChange }: { onChange: (msg: any) => void }) => {
  const [feeType, setFeeType] = useState("")
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")
  const [feeValue, setFeeValue] = useState("")
  const [address, setAddress] = useState("")

  const feeTypeOnChange = (index: number) => {
    let value = index === 0 ? "percentage" : "fixed"
    setFeeType(value)
    onChange({
      fee_type: value,
      module_name: moduleName,
      fee_name: feeName,
      data: toBinary({
        value: feeValue,
        address: address === "" ? null : address,
      }),
    })
  }

  const moduleNameOnChange = (value: string) => {
    setModuleName(value)
    onChange({
      fee_type: feeType,
      module_name: value,
      fee_name: feeName,
      data: toBinary({
        value: feeValue,
        address: address === "" ? null : address,
      }),
    })
  }

  const feeNameOnChange = (value: string) => {
    setFeeName(value)
    onChange({
      fee_type: feeType,
      module_name: moduleName,
      fee_name: value,
      data: toBinary({
        value: feeValue,
        address: address === "" ? null : address,
      }),
    })
  }

  const feeValueOnChange = (value: string) => {
    setFeeValue(value)
    onChange({
      fee_type: feeType,
      module_name: moduleName,
      fee_name: feeName,
      data: toBinary({
        value: value,
        address: address === "" ? null : address,
      }),
    })
  }
  const addressOnChange = (value: string) => {
    setAddress(value)
    onChange({
      fee_type: feeType,
      module_name: moduleName,
      fee_name: feeName,
      data: toBinary({
        value: feeValue,
        address: value === "" ? null : value,
      }),
    })
  }

  return (
    <div>
      <Dropdown
        items={["percentage", "fixed"]}
        title="Fee Type"
        onChange={feeTypeOnChange}
        placeholder="Select Fee Type"
      />
      <TextInput
        title="Module Name"
        placeholder="marketplace"
        onChange={moduleNameOnChange}
        isRequired
      />
      <TextInput
        title="Fee Name"
        placeholder="owner"
        onChange={feeNameOnChange}
        isRequired
      />
      {feeType === "percentage" && (
        <TextInput
          title="Percentage Fee"
          placeholder="15%"
          onChange={setFeeValue}
          isRequired
        />
      )}
      {feeType === "fixed" && (
        <TextInput
          title="Fixed Fee"
          placeholder="5"
          onChange={feeValueOnChange}
          isRequired
        />
      )}
      <TextInput
        title="Payment Address"
        placeholder="juno..."
        onChange={addressOnChange}
      />
    </div>
  )
}
