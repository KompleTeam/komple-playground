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

const CONTRACT_URLS = {
  modules: {
    fee: "create",
    hub: "create",
    marketplace: "query",
    merge: "query",
    metadata: "query",
    mint: "query",
    permission: "query",
    token: "query",
    whitelist: "query",
  },
  permissions: {
    attribute: "query",
    link: "query",
    ownership: "query",
  },
}

export const Navbar = () => {
  const walletManager = useWallet()

  const { walletStatus, username, address, isWalletConnecting } = walletManager
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

  const switchNetwork = async () => {
    await disconnect()
    if (currentChainName === "junotestnet") {
      setCurrentChain("juno")
    } else {
      setCurrentChain("junotestnet")
    }
    await connect()
  }

  return (
    <div
      className={clsx(
        "h-[96px] w-full fixed bg-komple-black-600 border-b-[1px] border-komple-black-500",
        "flex items-center justify-center z-20"
      )}
    >
      <div className="flex items-center justify-between max-w-[1380px] w-[1380px]">
        <div className="w-[230px] flex items-center">
          <Link href="/">
            <Logo />
          </Link>
          {/* {isConnected && (
            <button
              className="ml-[24px] flex items-center group"
              onClick={switchNetwork}
            >
              <div className="h-[32px] w-[32px] rounded-full bg-komple-black-700/20 flex items-center justify-center group-hover:animate-spin">
                <Image
                  src="/icons/switch.svg"
                  alt="Switch Icon"
                  width={16}
                  height={16}
                />
              </div>
              <div className="ml-2 text-white">
                Switch to{" "}
                {currentChainName === "junotestnet" ? "mainnet" : "testnet"}
              </div>
            </button>
          )} */}
        </div>

        <div className="flex">
          <HoverDropdown
            text="Modules"
            data={MODULES}
            right
            urls={CONTRACT_URLS}
          />
          <div className="w-[32px]" />
          <HoverDropdown
            text="Permissions"
            data={PERMISSIONS}
            left
            urls={CONTRACT_URLS}
          />
          <div className="w-[32px]" />
          <Link href="/upload" className="text-white">
            UPLOAD CONTRACT
          </Link>
        </div>

        <div className="w-[230px] flex justify-end">
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
            <Button
              text="Connect wallet"
              onClick={handleConnect}
              className="h-[40px] mx-3"
              loading={isWalletConnecting}
            />
          )}
        </div>
      </div>
    </div>
  )
}
