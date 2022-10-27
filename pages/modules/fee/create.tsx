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
      <div className="mt-20 flex">
        <ContractTabs contract="Fee" isModule />
        <div className="w-10" />
        <div>dasdasdasdasdas</div>
      </div>
    </div>
  )
}
