// pages/api/search.js

import { google } from 'googleapis'

export default async (req, res) => {
  const { keyword } = req.query

  try {
    const response = await getSearchResponse(keyword)
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getSearchResponse = async keyword => {
  const customSearchEngineID = process.env.NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID

  const service = google.customsearch('v1')
  const options = {
    q: keyword,
    cx: customSearchEngineID,
    lr: 'lang_ja',
    num: 10,
    start: 1
  }

  const response = await service.cse.list(options)
  return response.data
}
