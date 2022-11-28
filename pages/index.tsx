import { ContractHeader } from "components/contracts/ContractHeader"
import { SectionBox } from "components/SectionBox"

export default function Home() {
  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Welcome to Komple Framework Playground!"
        description="This playground is here to help you to try out Komple Framework and configure your project the way you want it to be."
        documentation="https://docs.komple.io"
      />
      <div className="flex justify-center mt-[75px]">
        <SectionBox
          title="Modules"
          description="For interacting with Komple Framework Modules."
          link="/modules"
        />
        <SectionBox
          title="Permissions"
          description="For interacting with Komple Framework Permissions."
          link="/permissions"
        />
        <SectionBox
          title="Upload Contract"
          description="For uploading contracts to use with Komple Framework."
          link="/upload"
        />
      </div>
    </div>
  )
}
