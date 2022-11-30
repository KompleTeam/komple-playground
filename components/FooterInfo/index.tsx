import Image from "next/image"

export const FooterInfo = ({
  link,
  image,
  imageSize,
  text,
}: {
  link: string
  image: string
  imageSize: Record<string, number>
  text: string
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-[90px] w-[210px] flex flex-col items-center justify-center"
    >
      <div className="text-[#AAAAAA] text-[16px] mb-3">{text}</div>
      <Image
        src={image}
        alt="Brand Logo"
        height={imageSize["height"]}
        width={imageSize["width"]}
      />
    </a>
  )
}
