import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useEffect, useState } from "react"
import { useHubModuleStore } from "store"

export const HubModuleRegisterModuleMarketplace = () => {
  const store = useHubModuleStore((state) => state)

  const [isNative, setIsNative] = useState(true)
  const [denom, setDenom] = useState("")
  const [cw20_address, setCw20Address] = useState("")

  useEffect(() => {
    store.setMsg({
      fund_info: {
        is_native: isNative,
        denom,
        cw20_address: cw20_address === "" ? undefined : cw20_address,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNative, denom, cw20_address])

  return (
    <div>
      <Switch
        title="Native Token"
        subtitle="Select native or cw20 tokens"
        onChange={(value) => setIsNative(value)}
        initialState={isNative}
      />
      <TextInput
        title={`${isNative ? "Native" : "CW20"} Token Denom`}
        subtitle="The denom of the token"
        placeholder={isNative ? "ujunox" : "utoken"}
        onChange={(denom) => setDenom(denom)}
        isRequired
        value={denom}
      />
      {!isNative && (
        <TextInput
          title="CW20 Token Address"
          subtitle="The address of the cw20 token contract"
          placeholder="juno...."
          onChange={(value) => setCw20Address(value)}
          value={cw20_address.toString()}
          isRequired
        />
      )}
    </div>
  )
}
