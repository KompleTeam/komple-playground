import { InputDateTime } from "components/InputDateTime"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { useTokenModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const TokenModuleInitWhitelistContract = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Code ID"
        onChange={(value) =>
          store.setCodeId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.codeId === 0 ? "" : store.codeId.toString()}
      />
      <TextInputList
        title="Whitelist Members"
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
      <InputDateTime
        title="Whitelist Start Time"
        isRequired
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setWhitelistInstantiateMsg({
            ...store.whitelistInstantiateMsg,
            config: {
              ...store.whitelistInstantiateMsg.config,
              start_time: date ? (date.getTime() * 1000000).toString() : "",
            },
          })
        }
        value={
          store.whitelistInstantiateMsg.config.start_time
            ? new Date(
                Number(store.whitelistInstantiateMsg.config.start_time) /
                  1000000
              )
            : ""
        }
      />
      <InputDateTime
        title="Whitelist End Time"
        isRequired
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setWhitelistInstantiateMsg({
            ...store.whitelistInstantiateMsg,
            config: {
              ...store.whitelistInstantiateMsg.config,
              end_time: date ? (date.getTime() * 1000000).toString() : "",
            },
          })
        }
        value={
          store.whitelistInstantiateMsg.config.end_time
            ? new Date(
                Number(store.whitelistInstantiateMsg.config.end_time) / 1000000
              )
            : ""
        }
      />
      <TextInput
        title="Tokens Per Address Limit"
        onChange={(value) =>
          store.setWhitelistInstantiateMsg({
            ...store.whitelistInstantiateMsg,
            config: {
              ...store.whitelistInstantiateMsg.config,
              per_address_limit: isInteger(value) ? Number(value) : 0,
            },
          })
        }
        isRequired
        value={
          store.whitelistInstantiateMsg.config.per_address_limit === 0
            ? ""
            : store.whitelistInstantiateMsg.config.per_address_limit?.toString()
        }
      />
      <TextInput
        title="Whitelist Member Limit"
        onChange={(value) =>
          store.setWhitelistInstantiateMsg({
            ...store.whitelistInstantiateMsg,
            config: {
              ...store.whitelistInstantiateMsg.config,
              member_limit: isInteger(value) ? Number(value) : 0,
            },
          })
        }
        isRequired
        value={
          store.whitelistInstantiateMsg.config.member_limit === 0
            ? ""
            : store.whitelistInstantiateMsg.config.member_limit?.toString()
        }
      />
    </div>
  )
}
