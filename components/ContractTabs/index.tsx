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

  console.log(router)

  return (
    <div className="flex">
      <div className="border-r border-komple-black-300">
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
                  "px-[24px] pr-10 py-4 rounded-md w-fit",
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
                    "text-[16px] mt-[8px]",
                    router.route.includes(item.href)
                      ? "text-white"
                      : "text-komple-black-100"
                  )}
                >
                  {item.text} a {contract} {isModule ? "Module" : "Permission"}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
