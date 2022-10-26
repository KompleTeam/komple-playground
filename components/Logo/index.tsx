import Image from "next/image"

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      height={40}
      width={40}
      alt="Komple Logo"
      className="rounded-[4px]"
    />
  )
}
