import { ContractHeader } from "components/contracts/ContractHeader"
import { SectionBox } from "components/SectionBox"
import { DOC_LINKS } from "config/docs"

const Modules = () => {
  return (
    <div>
      <ContractHeader
        title="Komple Framework Modules"
        description="Modules are the building blocks of Komple Framework."
        documentation={DOC_LINKS.modules.root}
      />

      <div className="flex justify-center mt-[60px]">
        <SectionBox
          title="Fee"
          description="For interacting with Komple Framework Modules."
          link="/modules/fee/create"
        />
        <SectionBox
          title="Hub"
          description="For interacting with Komple Framework Modules."
          link="/modules/hub/create"
        />
        <SectionBox
          title="Marketplace"
          description="For interacting with Komple Framework Modules."
          link="/modules/marketplace/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Merge"
          description="For interacting with Komple Framework Modules."
          link="/modules/merge/query"
        />
        <SectionBox
          title="Metadata"
          description="For interacting with Komple Framework Modules."
          link="/modules/metadata/query"
        />
        <SectionBox
          title="Mint"
          description="For interacting with Komple Framework Modules."
          link="/modules/mint/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Permission"
          description="For interacting with Komple Framework Modules."
          link="/modules/permission/query"
        />
        <SectionBox
          title="Token"
          description="For interacting with Komple Framework Modules."
          link="/modules/token/query"
        />
        <SectionBox
          title="Whitelist"
          description="For interacting with Komple Framework Modules."
          link="/modules/whitelist/query"
        />
      </div>
    </div>
  )
}

export default Modules
