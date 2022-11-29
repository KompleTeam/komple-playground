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
          description="Permission for comparing attribute values."
          link="/permissions/attribute/query"
        />
        <SectionBox
          title="Link"
          description="Permission for checking links between collections."
          link="/permissions/link/query"
        />
        <SectionBox
          title="Ownership"
          description="Permission for checking ownership of a token."
          link="/permissions/ownership/query"
        />
      </div>
    </div>
  )
}

export default Permissions
