export const formatCurrency = (price: number): string => {
  return Number(price).toLocaleString("id-ID")
};


export const textEllipsis = (text:string) => {
  return text.length < 35 ? `${text}` : `${text.substring(0, 32)}...`;
};