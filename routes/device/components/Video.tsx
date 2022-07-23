import { Box, Text, Flex } from "@chakra-ui/react"
import { DeviceVideoDataType } from "api/fetchers"
import { useState, useRef, useEffect } from "react"
import { SWRResponse } from "swr"
import { constants } from "utils/constants"
import { ColourChange } from "./ColourChange"

type VideoType = {
  videoUrl: string
  videoData: SWRResponse<DeviceVideoDataType, any>
  getCurrentFrame: (currentFrame: number, frameCount: number) => void
}

export const Video: React.FC<VideoType> = ({ videoUrl, videoData, getCurrentFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [progress, setProgress] = useState<number>(0)
  const [frameCount, setFrameCount] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    getCurrentFrame(0, frameCount)
  }, [frameCount])

  useEffect(() => {
    if (videoData.data && videoRef.current) {
      const frameCount = Object.keys(videoData.data.frame_data).length - 1
      setFrameCount(frameCount)
    }
  }, [videoData, videoRef])

  useEffect(() => {
    function resize() {
      const size = videoRef?.current?.getBoundingClientRect().width
    }
  })

  const boundingBox = videoData.data?.RoI

  const handleVideoTimeChange = () => {
    if (videoRef.current && frameCount && canvasRef.current && boundingBox) {
      const progressCalc = (videoRef?.current.currentTime / videoRef?.current.duration) * 100
      setProgress(progressCalc)
      getCurrentFrame(Math.floor((progressCalc / 100) * frameCount), frameCount)

      canvasRef.current.getContext("2d")?.drawImage(
        videoRef.current,
        boundingBox[0], boundingBox[1],
        boundingBox[2], boundingBox[3],
        0, 0,
        boundingBox[2], boundingBox[3],
      )
    }
  }

  const canvasWidth = boundingBox && boundingBox[2] || 0;
  const canvasHeight = boundingBox && boundingBox[3] || 0;

  return (
    <Box>
      <video controls ref={videoRef} onTimeUpdate={handleVideoTimeChange}>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <Text mt={2}>
        {constants.videoColourChange}
      </Text>
      <ColourChange data={videoData.data?.frame_data} videoProgress={progress} />
      <Box mt={4}>
        <Text>
          {constants.videoBoundingBox}
        </Text>
        <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef} />
      </Box>
    </Box>
  )
}
