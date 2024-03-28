import { Sentiment } from "@src/types/MainType"

export type NewsSummary = {
  thumbnail_url: string
  article_title: string
  article_link: string
  article_summary: string
  press: string
  date_time: string
  keywords: string[]
  topic: string
  sentiment: Sentiment[]
}

export type NewsDetail = {
  detail_date: string
  detail_press: string
  detail_text: string
  detail_title: string
  detail_url: string
}

export type HotNews = {
  headline_date: string
  headline_press: string
  headline_summary: string
  headline_thumbnail_url: string
  headline_title: string
  headline_url: string
}
