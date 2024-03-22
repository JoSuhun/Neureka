export type CompanyType = {
  companyId: number
  code: string
  companyName: string
}

export type CompanyPriceType = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  change: number | null
  ema12?: number
  ema26?: number
  bullPower?: number
  bearPower?: number
}
