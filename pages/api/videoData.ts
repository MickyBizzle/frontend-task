import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function videoData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fileUrl } = req.query
  const { data } = await axios.get(fileUrl as string)
  res.json(data)
}
