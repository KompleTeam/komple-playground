import clsx from "clsx"
import Link from "next/link"
import { Button } from "../Button"
import { HoverDropdown } from "../Dropdown"
import { Logo } from "../Logo"
import { useConnect, useDisconnect, useAccount, testnetChains } from "graz"
import { getShortAddress } from "../../utils/getShortAddress"
import Image from "next/image"
import { GasPrice } from "@cosmjs/stargate"

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

  const handleConnect = () => {
    return isConnected
      ? disconnect()
      : connect({
          chainId: testnetChains.juno.chainId,
          currencies: testnetChains.juno.currencies,
          rest: testnetChains.juno.rest,
          rpc: testnetChains.juno.rpc,
          signerOpts: {
            gasPrice: GasPrice.fromString(
              `0.025${testnetChains.juno.stakeCurrency.coinMinimalDenom}`
              // `0.025ujuno`
            ),
          },
        })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(account?.bech32Address || "")
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
              <div className="text-white font-bold">{account?.name}</div>
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
                {getShortAddress(account?.bech32Address || "")}
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
