import axios from 'axios'
import { simulateDelay } from 'utils/simulateDelay'

export type DeviceType = {
  output: string[]
}

export type DeviceResultType = {
  output: {
    cvmdata: string
    videofiles: string
  }
  err?: string
}

export type DeviceVideoDataType = {
  RoI: number[]
  frame_data: {
    [key: number]: {
      avgB: number
      avgG: number
      avgR: number
      histDiff: number
    }
  }
}

export const deviceList = async (userId: string, orgId: string) => {
  await simulateDelay(1500)
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/getdevices`, {
      params: { userId, orgId },
    })
    .then((res) => res.data as DeviceType)
}

export const deviceResults = async (deviceId: string) => {
  await simulateDelay(1500)
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/getdevicedata`, {
      params: { deviceId },
    })
    .then(({ data }: { data: DeviceResultType }) => {
      if (data.err) throw new Error(data.err)

      return data
    })
}

export const deviceVideoData = async (jsonUrl: string) => {
  await simulateDelay(500)
  return axios
    .get(`/api/videoData?fileUrl=${jsonUrl}`)
    .then((res) => res.data as DeviceVideoDataType)
}
