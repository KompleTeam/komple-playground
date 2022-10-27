import { ReactNode } from "react"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex justify-between">
      <div />
      <div className="max-w-[1080px] w-[1080px]">{children}</div>
      <div />
    </div>
  )
}
