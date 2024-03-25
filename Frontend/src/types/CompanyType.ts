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

export type UserType = {
  userId: number
  username: string
  name: string
  email: string
  role: string
}

export type CompanyLikeType = {
  id: number
  company: CompanyType
  user: UserType
}

export type CompanyLikeParmasType = {
  email: string
  code: string
}

export type MainTopSectionProps = {
  handleAddMyStock: () => void
}

export type CompanyLatestParamsType = {
  email: string
  code: string
  companyName: string
}

export type CompanyLatestType = {
  companyCode: string
  crId: number
  email: string
  companyName: string
}

export type CompanyNewsType = {
  link: string
  press: string
  summary: string
  thumbnail_url: string
  title: string
}
