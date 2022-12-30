import { ContractHeader } from "components/contracts/ContractHeader"
import { SectionBox } from "components/SectionBox"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"

const Modules = () => {
  return (
    <div>
      <Head>
        <title>Modules | Komple Playground</title>
        <meta
          property="og:title"
          content="Modules | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Modules"
        description="Modules are the building blocks of Komple Framework."
        documentation={DOC_LINKS.modules.root}
      />

      <div className="flex justify-center mt-[60px]">
        <SectionBox
          title="Fee"
          description="Module for fee management and distribution."
          link="/modules/fee/create"
        />
        <SectionBox
          title="Hub"
          description="Module for module regisration and management."
          link="/modules/hub/create"
        />
        <SectionBox
          title="Marketplace"
          description="Module for peer-to-peer trading of tokens."
          link="/modules/marketplace/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Merge"
          description="Module for merging multiple tokens into one."
          link="/modules/merge/query"
        />
        <SectionBox
          title="Metadata"
          description="Module for token metadata management."
          link="/modules/metadata/query"
        />
        <SectionBox
          title="Mint"
          description="Module for collection management and minting."
          link="/modules/mint/query"
        />
      </div>
      <div className="flex justify-center mt-[20px]">
        <SectionBox
          title="Permission"
          description="Module for permission registration and management."
          link="/modules/permission/query"
        />
        <SectionBox
          title="Token"
          description="Module for token management and collection configuration."
          link="/modules/token/query"
        />
        <SectionBox
          title="Whitelist"
          description="Module for collection whitelist management."
          link="/modules/whitelist/query"
        />
      </div>
    </div>
  )
}

export default Modules
