import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <Flex bg="white" h="100%" flex={1} p={4} borderRadius={8} shadow="lg">
    Home Page
  </Flex>
}

export default Home
