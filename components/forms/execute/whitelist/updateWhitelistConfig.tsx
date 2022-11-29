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
      <TextInput
        title="Start Time"
        onChange={(start_time) =>
          store.setConfig({
            ...store.config,
            start_time,
          })
        }
        value={store.config.start_time?.toString()}
      />
      <TextInput
        title="End Time"
        onChange={(end_time) =>
          store.setConfig({
            ...store.config,
            end_time,
          })
        }
        value={store.config.end_time?.toString()}
      />
    </div>
  )
}
