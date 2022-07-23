import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react'

type ColourChangeType = {
  data: {
    [key: number]: {
      avgB: number;
      avgG: number;
      avgR: number;
      histDiff: number;
    };
  } | undefined
  videoProgress: number
}

export const ColourChange: React.FC<ColourChangeType> = ({ data, videoProgress }) => {
  const colourBar = useMemo(() => {
    if (data) {
      return Object.keys(data).map(frame => {
        const { avgR, avgG, avgB } = data[frame]
        return `rgb(${avgR},${avgG},${avgB})`
      })
    }
  }, [data])
  return (
    <Flex bg="red" w="100%" h="50px" bgGradient={`linear(to-r, ${colourBar?.join(',')})`} position="relative">
      <Flex h="120%" w="10px" border="2px solid green" top="50%" left={`${videoProgress}%`} transform="translate(-50%, -50%)" position="absolute" />
    </Flex>
  )
}
