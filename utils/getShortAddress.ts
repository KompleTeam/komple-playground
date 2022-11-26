export const getShortAddress = (address: string, charCount = 36) => {
  return address.slice(0, 8).concat(".....") + address.substring(charCount)
}
