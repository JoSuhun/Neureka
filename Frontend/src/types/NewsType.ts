export type NewsSummary = {
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keywords: string[]
  topic: string
}

export type NewsDetail = {
  detail_date: string
  detail_press: string
  detail_text: string
  detail_title: string
  detail_url: string
}
