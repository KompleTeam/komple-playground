import { Switch } from "components/Switch"
import useTokenModuleStore from "store/modules/token"

export const TokenModuleUpdateLocks = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Mint Lock"
        onChange={(mint_lock) => store.setLocks({ ...store.locks, mint_lock })}
        initialState={store.locks.mint_lock}
      />
      <Switch
        title="Burn Lock"
        onChange={(burn_lock) => store.setLocks({ ...store.locks, burn_lock })}
        initialState={store.locks.burn_lock}
      />
      <Switch
        title="Transfer Lock"
        onChange={(transfer_lock) =>
          store.setLocks({ ...store.locks, transfer_lock })
        }
        initialState={store.locks.transfer_lock}
      />
      <Switch
        title="Send Lock"
        onChange={(send_lock) => store.setLocks({ ...store.locks, send_lock })}
        initialState={store.locks.send_lock}
      />
    </div>
  )
}
