import clsx from "clsx"

export const ContractHeader = ({
  title,
  description,
  documentation,
}: {
  title: string
  description: string
  documentation: string
}) => {
  return (
    <div className={clsx("mt-8", "flex flex-col justify-center items-center")}>
      <div className="text-white font-bold text-[32px]">{title}</div>
      <div className="mt-[16px] text-[18px] text-komple-black-100">
        {description}
      </div>
      <div className="text-[18px] text-komple-black-100">
        Learn more in the{" "}
        <a className="text-komple-red-400" href={documentation}>
          documentation
        </a>
        .
      </div>
    </div>
  )
}
