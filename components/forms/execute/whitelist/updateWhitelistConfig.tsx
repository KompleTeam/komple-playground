import { InputDateTime } from "components/InputDateTime"
import { TextInput } from "components/TextInput"
import useWhitelistModuleStore from "store/modules/whitelist"
import { isInteger } from "utils/isInteger"

export const WhitelistModuleUpdateWhitelistConfig = () => {
  const store = useWhitelistModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Per Address Limit"
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
        title="Member Limit"
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
        title="Start Time"
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
        title="End Time"
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
