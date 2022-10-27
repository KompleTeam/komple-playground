import { ContractHeader } from "../../../components/ContractHeader"
import { ContractTabs } from "../../../components/ContractTabs"

export default function FeeModuleCreate() {
  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Fee Module"
        description="Fee module is used for defining dadhsahdas dasj dajajh whajdwhjdw dajdahd dwadad."
        documentation="https://docs.komple.io/komple/framework-fundamentals/modules/fee-module"
      />
      <div>
        <ContractTabs contract="Fee" isModule />
      </div>
    </div>
  )
}
