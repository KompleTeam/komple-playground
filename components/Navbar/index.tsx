import clsx from "clsx"
import Link from "next/link"
import { Button } from "../Button"
import { HoverDropdown } from "../Dropdown"
import { Logo } from "../Logo"
import { getShortAddress } from "../../utils/getShortAddress"
import Image from "next/image"
import { useWallet } from "@cosmos-kit/react"

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
  const walletManager = useWallet()

  const { walletStatus, username, address } = walletManager
  const { connect, disconnect, setCurrentChain, currentChainName } =
    walletManager

  const isConnected = walletStatus === "Connected"

  const handleConnect = async () => {
    if (!isConnected) {
      setCurrentChain("junotestnet")
      await connect()
    } else await disconnect()
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address || "")
  }

  return (
    <div
      className={clsx(
        "h-[96px] w-full px-[64px] fixed bg-komple-black-400",
        "flex justify-between items-center z-20"
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
        {isConnected ? (
          <div>
            <div className="flex justify-end items-center">
              <button onClick={handleConnect}>
                <Image
                  src="/icons/disconnect.svg"
                  alt="Disconnect Logo"
                  height={14}
                  width={13}
                  className="mr-1"
                />
              </button>
              <div className="text-white font-bold">{username}</div>
            </div>
            <div className="flex justify-end items-center">
              <button onClick={copyAddress}>
                <Image
                  src="/icons/copy.svg"
                  alt="Copy Logo"
                  height={14}
                  width={12}
                  className="mr-1 poi"
                />
              </button>
              <div className="text-komple-black-100">
                {getShortAddress(address || "")}
              </div>
            </div>
          </div>
        ) : (
          <Button text="Connect wallet" onClick={handleConnect} />
        )}
      </div>
    </div>
  )
}
