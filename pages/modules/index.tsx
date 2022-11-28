import { ContractHeader } from "components/contracts/ContractHeader"
import { SectionBox } from "components/SectionBox"
import { DOC_LINKS } from "config/docs"

const Modules = () => {
  return (
    <div>
      <ContractHeader
        title="Modules"
        description="Modules are the building blocks of Komple Framework."
        documentation={DOC_LINKS.modules.root}
      />

      <div className="flex justify-center mt-[60px]">
        <SectionBox
          title="Fee"
          description="Fee management module."
          link="/modules/fee/create"
        />
        <SectionBox
          title="Hub"
          description="Address registry module."
          link="/modules/hub/create"
        />
        <SectionBox
          title="Marketplace"
          description="Peer-to-peer marketplace module."
          link="/modules/marketplace/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Merge"
          description="Token merge module."
          link="/modules/merge/query"
        />
        <SectionBox
          title="Metadata"
          description="Metadata management module."
          link="/modules/metadata/query"
        />
        <SectionBox
          title="Mint"
          description="Collection management module."
          link="/modules/mint/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Permission"
          description="Permission registry module."
          link="/modules/permission/query"
        />
        <SectionBox
          title="Token"
          description="Token management module."
          link="/modules/token/query"
        />
        <SectionBox
          title="Whitelist"
          description="Collection whitelist management module."
          link="/modules/whitelist/query"
        />
      </div>
    </div>
  )
}

export default Modules
