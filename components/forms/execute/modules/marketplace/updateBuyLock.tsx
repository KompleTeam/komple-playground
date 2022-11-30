import { Switch } from "components/Switch"
import { useMarketplaceModuleStore } from "store"

export const MarketplaceModuleUpdateBuyLock = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
      <Switch
        title="Marketplace Buy Lock"
        subtitle="Enable or disable marketplace buy lock"
        initialState={store.lock}
        onChange={store.setLock}
      />
    </div>
  )
}
