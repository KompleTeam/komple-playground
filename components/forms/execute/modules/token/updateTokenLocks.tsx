import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"

export const TokenModuleUpdateTokenLocks = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Token ID"
        subtitle="The ID of the token"
        placeholder="17"
        onChange={store.setTokenId}
        isRequired
        value={store.tokenId}
      />
      <Switch
        title="Mint Lock"
        subtitle="Enable or disable minting"
        onChange={(mint_lock) => store.setLocks({ ...store.locks, mint_lock })}
        initialState={store.locks.mint_lock}
      />
      <Switch
        title="Burn Lock"
        subtitle="Enable or disable burning"
        onChange={(burn_lock) => store.setLocks({ ...store.locks, burn_lock })}
        initialState={store.locks.burn_lock}
      />
      <Switch
        title="Transfer Lock"
        subtitle="Enable or disable transferring"
        onChange={(transfer_lock) =>
          store.setLocks({ ...store.locks, transfer_lock })
        }
        initialState={store.locks.transfer_lock}
      />
      <Switch
        title="Send Lock"
        subtitle="Enable or disable sending"
        onChange={(send_lock) => store.setLocks({ ...store.locks, send_lock })}
        initialState={store.locks.send_lock}
      />
    </div>
  )
}
