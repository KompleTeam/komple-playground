import { InputDateTime } from "components/InputDateTime"
import { TextInput } from "components/TextInput"
import { useWhitelistModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const WhitelistModuleUpdateWhitelistConfig = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Tokens Per Address Limit"
        subtitle="The maximum number of tokens that can be minted per address"
        placeholder="10"
        onChange={(value) =>
          store.setConfig({
            ...store.config,
            per_address_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.config.per_address_limit === 0
            ? ""
            : store.config.per_address_limit?.toString()
        }
      />
      <TextInput
        title="Whitelist Member Limit"
        subtitle="The maximum number of members that can be added to the whitelist"
        placeholder="150"
        onChange={(value) =>
          store.setConfig({
            ...store.config,
            member_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.config.member_limit === 0
            ? ""
            : store.config.member_limit?.toString()
        }
      />
      <InputDateTime
        title="Whitelist Start Time"
        subtitle="The time when minting starts - DD/MM/YYYY"
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setConfig({
            ...store.config,
            start_time: date ? (date.getTime() * 1000000).toString() : "",
          })
        }
        value={
          store.config.start_time
            ? new Date(Number(store.config.start_time) / 1000000)
            : ""
        }
      />
      <InputDateTime
        title="Whitelist End Time"
        subtitle="The time when minting ends - DD/MM/YYYY"
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setConfig({
            ...store.config,
            end_time: date ? (date.getTime() * 1000000).toString() : "",
          })
        }
        value={
          store.config.end_time
            ? new Date(Number(store.config.end_time) / 1000000)
            : ""
        }
      />
    </div>
  )
}
