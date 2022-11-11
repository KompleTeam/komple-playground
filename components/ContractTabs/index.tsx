import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"

const ITEMS = [
  { text: "Create", href: "/create" },
  { text: "Query", href: "/query" },
  { text: "Execute", href: "/execute" },
]

export const ContractTabs = ({
  contract,
  isModule,
}: {
  contract: string
  isModule: boolean
}) => {
  const router = useRouter()

  return (
    <div className="flex">
      <div className="w-[350px]">
        {ITEMS.map((item) => {
          return (
            <Link
              key={item.text}
              href={`/${
                isModule ? "modules" : "permissions"
              }/${contract.toLowerCase()}${item.href}`}
            >
              <div
                key={item.text}
                className={clsx(
                  "px-[24px] py-4 rounded-md mb-6",
                  router.route.includes(item.href) && "bg-komple-black-300"
                )}
              >
                <div
                  className={clsx(
                    "text-[24px]",
                    router.route.includes(item.href)
                      ? "text-komple-red-400"
                      : "text-white"
                  )}
                >
                  {item.text}
                </div>
                <div
                  className={clsx(
                    "text-[16px]",
                    router.route.includes(item.href)
                      ? "text-white"
                      : "text-komple-black-100"
                  )}
                >
                  {item.text} {contract} {isModule ? "Module" : "Permission"}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="ml-5 border border-komple-black-300" />
    </div>
  )
}
