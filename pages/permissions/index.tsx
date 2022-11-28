import { ContractHeader } from "components/contracts/ContractHeader"
import { SectionBox } from "components/SectionBox"
import { DOC_LINKS } from "config/docs"

const Permissions = () => {
  return (
    <div>
      <ContractHeader
        title="Permissions"
        description="Permissions are dynamic set of rules on contracts."
        documentation={DOC_LINKS.permissions.root}
      />

      <div className="flex justify-center mt-[60px]">
        <SectionBox
          title="Attribute"
          description="Fee management module."
          link="/permissions/attribute/create"
        />
        <SectionBox
          title="Link"
          description="Address registry module."
          link="/permissions/link/create"
        />
        <SectionBox
          title="Ownership"
          description="Peer-to-peer marketplace module."
          link="/permissions/ownership/create"
        />
      </div>
    </div>
  )
}

export default Permissions
