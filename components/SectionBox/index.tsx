import Link from "next/link"
import { motion } from "framer-motion"

export const SectionBox = ({
  title,
  description,
  link,
}: {
  title: string
  description: string
  link: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link href={link}>
        <div className="h-[120px] w-[270px] p-4 border-[1px] border-komple-black-200 rounded-lg mx-4 hover:border-white/30 hover:bg-white/5">
          <div className="text-[24px] font-semibold text-white">{title}</div>
          <div className="text-komple-black-100 leading-5 mt-1">
            {description}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
