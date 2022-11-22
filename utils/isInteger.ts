export const isInteger = (value: string) => {
  if (typeof value !== "string") {
    return false
  }

  const num = Number(value)

  if (Number.isInteger(num) && num > 0) {
    return true
  }

  return false
}
