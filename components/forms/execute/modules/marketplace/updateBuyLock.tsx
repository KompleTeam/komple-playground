import { Switch } from "components/Switch"
import { useMarketplaceModuleStore } from "store"

export const MarketplaceModuleUpdateBuyLock = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Buy Locked"
        initialState={store.lock}
        onChange={store.setLock}
      />
    </div>
  )
}
