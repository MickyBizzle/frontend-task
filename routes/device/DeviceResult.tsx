import { Alert, AlertDescription, AlertIcon, AlertTitle, Center, Flex, Spinner, Text } from '@chakra-ui/react'
import { deviceResults as deviceResultsFetcher, deviceVideoData } from 'api/fetchers'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { constants } from 'utils/constants'
import { RGBSlider } from './components/RGBSlider'
import { Video } from './components/Video'

export const DeviceResult = () => {
  const router = useRouter()
  const { deviceId } = router.query
  const deviceFromUrl = deviceId ? deviceId[0] as string : null

  const deviceResults = useSWR(deviceFromUrl, deviceResultsFetcher)
  const videoData = useSWR(deviceResults.data?.output.cvmdata, deviceVideoData)

  const [currentFrame, setCurrentFrame] = useState<number>(0)
  const [frameCount, setFrameCount] = useState<number>(0)

  const handleCurrentFrame = (frame: number, frameCount: number) => {
    setCurrentFrame(frame)
    setFrameCount(frameCount)
  }

  return (
    <Flex flex={1} mt={4} position="relative">
      {(deviceResults.isValidating || videoData.isValidating) && !videoData.data && <Center position="absolute" bg="whiteAlpha.500" w="100%" h="100%">
        <Spinner size="xl" />
      </Center>}
      {deviceResults.error && <Alert status='error'>
        <AlertTitle>
          {constants.deviceResultErrorTitle}
        </AlertTitle>
        <AlertIcon />
        <AlertDescription>
          {deviceResults.error.message}
        </AlertDescription>
      </Alert>}
      {deviceResults.data &&
        <Flex flex={1}>
          <Flex flex={1}>
            <Video videoUrl={deviceResults.data.output.videofiles} videoData={videoData} getCurrentFrame={handleCurrentFrame} />
          </Flex>
          <Flex flex={1} p={4} flexDirection="column">
            <Text fontSize="xl" fontWeight="bold">
              {`Current frame: ${currentFrame + 1} / ${frameCount + 1}`}
            </Text>
            <Flex alignItems="center" mt={8} >
              <Text mr={4}>
                {constants.deviceResultAverageColour}
                :
              </Text>
              <Flex h="35px" w="100%" borderRadius={8} bg={`rgb(${videoData.data?.frame_data[currentFrame].avgR},${videoData.data?.frame_data[currentFrame].avgG},${videoData.data?.frame_data[currentFrame].avgB})`} transition="background 0.2s ease" />
            </Flex>
            <RGBSlider label='Red' color='r' value={videoData.data?.frame_data[currentFrame].avgR} />
            <RGBSlider label='Green' color='g' value={videoData.data?.frame_data[currentFrame].avgG} />
            <RGBSlider label='Blue' color='b' value={videoData.data?.frame_data[currentFrame].avgB} />
            <Text fontSize="md" mt={8}>
              {`Histogram: ${videoData.data?.frame_data[currentFrame].histDiff}`}
            </Text>
          </Flex>
        </Flex>}
    </Flex>
  )
}
