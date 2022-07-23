import { Box, Flex } from "@chakra-ui/react"
import { Sidebar } from "./components/Sidebar"

export const AppShell = ({ children }) => {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
      <Flex bg="gray.200" p={8} w="100%" h="100%">
        {children}
      </Flex>
    </Flex>
  )
}
