import { toast } from "react-toastify"

type MsgType = "info" | "error" | "wallet"

const getColors = (type: string) => {
  switch (type) {
    case "info":
      return {
        color: "#ffffff",
        background: "#333333",
      }
    case "error":
    case "wallet":
      return {
        color: "#FFFFFF",
        background: "#D01931",
      }
  }
}

export const showToast = ({
  type,
  title,
  message,
}: {
  type: MsgType
  title?: string
  message?: string
}) =>
  toast(
    <div>
      <div className="font-semibold">
        {title || (type === "wallet" && "Wallet Connection")}
      </div>
      <div>
        {message || (type === "wallet" && "Please connect your wallet")}
      </div>
    </div>,
    {
      position: "top-right",
      theme: "dark",
      hideProgressBar: true,
      autoClose: 5000,
      pauseOnHover: true,
      draggable: false,
      className: "toast-body",
      bodyClassName: "toast-body",
      style: {
        background: getColors(type)?.background,
        color: getColors(type)?.color,
        fontFamily: "degular",
        //   width: "390px",
        //   right: "80px",
        borderRadius: "10px",
      },
      closeButton: false,
    }
  )
