import { TextInputList } from "components/TextInputList"
import { useMarketplaceModuleStore } from "store"

export const MarketplaceModuleUpdateOperators = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Contract Operators"
        subtitle="List of contract operators"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
