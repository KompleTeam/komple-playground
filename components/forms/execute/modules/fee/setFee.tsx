import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { useState } from "react"
import { useFeeModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const FeeModuleSetFee = () => {
  const store = useFeeModuleStore((state) => state)

  const [feeType, setFeeType] = useState("")
  const [collectionId, setCollectionId] = useState(0)

  const feeTypeOnChange = (index: number) => {
    let value

    switch (index) {
      case 0:
        value = "price"
        store.setModuleName("mint")
        store.setFeeName("price:0")
        store.setFeeType("fixed")
        break
      case 1:
        value = "whitelist"
        store.setModuleName("mint")
        store.setFeeName("whitelist:0")
        store.setFeeType("fixed")
        break
      case 2:
        value = "royalty"
        store.setModuleName("mint")
        store.setFeeName("royalty:0")
        store.setFeeType("percentage")
        break
      case 3:
        value = "marketplace"
        store.setModuleName("marketplace")
        store.setFeeName("hub_admin")
        store.setFeeType("fixed")
        break
      case 4:
        value = "custom"
        store.setModuleName("")
        store.setFeeName("")
        break
      default:
        value = ""
        break
    }

    setFeeType(value)
    setCollectionId(0)
    store.setPaymentInfo({
      ...store.paymentInfo,
      value: "",
    })
  }

  const customFeeTypeOnChange = (index: number) => {
    let value = (index === 0 ? "percentage" : "fixed") as Fees
    store.setFeeType(value)
  }

  return (
    <div>
      <Dropdown
        items={[
          "Minting Price",
          "Whitelist Minting Price",
          "Collection Royalty Fee",
          "Marketplace Fee",
          "Custom Fee",
        ]}
        title="Fee Type"
        subtitle="Type of fee"
        onChange={feeTypeOnChange}
        placeholder="Select Fee Type"
        isRequired
      />

      {feeType === "custom" && (
        <>
          <Dropdown
            items={["percentage", "fixed"]}
            title="Custom Fee Type"
            subtitle="Type of fee"
            onChange={customFeeTypeOnChange}
            placeholder="Select Fee Type"
            isRequired
          />
          <TextInput
            title="Module Name"
            subtitle="Name of module the fee is set for"
            placeholder="marketplace"
            onChange={store.setModuleName}
            isRequired
            value={store.moduleName}
          />
          <TextInput
            title="Fee Name"
            subtitle="Identifier of the fee"
            placeholder="transaction"
            onChange={store.setFeeName}
            isRequired
            value={store.feeName}
          />
        </>
      )}

      {(feeType === "price" ||
        feeType === "whitelist" ||
        feeType === "royalty") && (
        <TextInput
          title="Collection ID"
          subtitle="The ID of the collection to set the fee for"
          placeholder="3"
          onChange={(value) => {
            const updatedValue = isInteger(value) ? Number(value) : 0
            store.setFeeName(`${feeType}:${updatedValue}`)
            setCollectionId(updatedValue)
          }}
          isRequired
          value={collectionId === 0 ? "" : collectionId.toString()}
        />
      )}

      {feeType !== "royalty" && store.feeType === "fixed" && (
        <TextInput
          title="Fixed Fee"
          subtitle="Fixed fee value to be charged"
          placeholder="20"
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

      {(feeType === "royalty" || store.feeType === "percentage") && (
        <TextInput
          title="Percentage Fee"
          subtitle="Percentage fee value to be charged"
          placeholder="0.05"
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
    </div>
  )
}
