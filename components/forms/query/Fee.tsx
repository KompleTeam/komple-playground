import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/framework/FeeModule.types"
import { useEffect, useState } from "react"

export type FeeModuleQueryType =
  | ""
  | "config"
  | "percentage_fee"
  | "fixed_fee"
  | "percentage_fees"
  | "fixed_fees"
  | "total_percentage_fees"
  | "total_fixed_fees"
  | "keys"

export interface FeeModuleQueryFormMsg {
  feeType: Fees
  moduleName: string
  feeName: string
  startAfter?: string
  limit?: number
}

export interface FeeModuleQueryInterface {
  query: FeeModuleQueryType
  onChange: (msg: FeeModuleQueryFormMsg) => void
}

export const FeeModuleQueryForm = ({
  query,
  onChange,
}: FeeModuleQueryInterface) => {
  const [feeType, setFeeType] = useState<Fees>("percentage")
  const [moduleName, setModuleName] = useState("")
  const [feeName, setFeeName] = useState("")
  const [startAfter, setStartAfter] = useState("")
  const [limit, setLimit] = useState("")

  useEffect(() => {
    onChange({
      feeType,
      moduleName,
      feeName,
      startAfter: startAfter === "" ? undefined : startAfter,
      limit: limit === "" ? undefined : parseInt(limit),
    })
  }, [onChange, feeType, moduleName, feeName, startAfter, limit])

  const feeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    setFeeType(value)
  }

  return (
    <div>
      {query === "keys" && (
        <Dropdown
          items={["percentage", "fixed"]}
          title="Fee Type"
          onChange={feeTypeOnChange}
          initialIdx={0}
        />
      )}

      {(query === "percentage_fee" ||
        query === "fixed_fee" ||
        query === "fixed_fees" ||
        query === "percentage_fees" ||
        query === "total_percentage_fees" ||
        query === "total_fixed_fees") && (
        <TextInput title="Module Name" onChange={setModuleName} isRequired />
      )}

      {(query === "percentage_fee" || query === "fixed_fee") && (
        <TextInput title="Fee Name" onChange={setFeeName} />
      )}

      {(query === "fixed_fees" ||
        query === "percentage_fees" ||
        query === "total_percentage_fees" ||
        query === "total_fixed_fees") && (
        <>
          <TextInput title="Start After" onChange={setStartAfter} />
          <TextInput title="Limit" onChange={setLimit} />
        </>
      )}
    </div>
  )
}
