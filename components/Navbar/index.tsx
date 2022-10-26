import clsx from "clsx"
import Link from "next/link"
import { Button } from "../Button"
import { HoverDropdown } from "../Dropdown"
import { Logo } from "../Logo"
import { useConnect, useDisconnect, useAccount } from "graz"

const MODULES = [
  "Fee",
  "Hub",
  "Marketplace",
  "Merge",
  "Metadata",
  "Mint",
  "Permission",
  "Token",
  "Whitelist",
]

const PERMISSIONS = ["Attribute", "Link", "Ownership"]

export const Navbar = () => {
  const { connect } = useConnect()
  const { data: account, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  console.log(account)

  function handleConnect() {
    return isConnected ? disconnect() : connect()
  }

  return (
    <div
      className={clsx(
        "h-[96px] w-full px-[64px]",
        "flex justify-between items-center"
      )}
    >
      <div className="w-[200px]">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex">
        <HoverDropdown text="Modules" data={MODULES} right />
        <div className="w-[32px]" />
        <HoverDropdown text="Permissions" data={PERMISSIONS} left />
      </div>

      <div className="w-[200px] flex justify-end">
        <Button text="Connect wallet" onClick={handleConnect} />
      </div>
    </div>
  )
}
