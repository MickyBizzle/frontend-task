import { Center, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { useRef } from 'react'

type SliderType = {
  label: string;
  color: 'r' | 'g' | 'b'
  value?: number
}

export const RGBSlider: React.FC<SliderType> = ({ label, color, value = 0 }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const gradientEnd = color === 'r' ? 'rgb(255,0,0)' : color === 'g' ? 'rgb(0,255,0)' : 'rgb(0,0,255)'
  const bgColour = color === 'r' ? `rgb(${value},0,0)` : color === 'g' ? `rgb(0,${value},0)` : `rgb(0,0,${value})`

  const left = `${(value / 255) * 100}%`

  return (
    <Tooltip label={value}>
      <Center mt={8}>
        <Text flex={1}>
          {`${label}:`}
        </Text>
        <Flex h="3px" flex={5} bgGradient={`linear(to-r, rgb(0,0,0), ${gradientEnd})`} borderRadius={2} position="relative" ref={sliderRef}>
          <Flex h="25px" w="25px" borderRadius="50%" bg={bgColour} position="absolute" top="50%" left={left} transform="translate(-50%, -50%)" transition="left 0.2s linear" />
        </Flex>
      </Center>
    </Tooltip>
  )
}
