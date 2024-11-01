const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
export const formatCurrency = (money:any) =>  new Intl.NumberFormat('vi-VN', config).format(money)