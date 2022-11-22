import { ReactNode } from "react"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex justify-between mb-20 pt-[96px]">
      <div />
      <div className="max-w-[1440px] w-[1440px]">{children}</div>
      <div />
    </div>
  )
}
