import { TextInputList } from "components/TextInputList"
import useMarketplaceModuleStore from "store/modules/marketplace"

export const MarketplaceModuleUpdateOperators = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Operators"
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
