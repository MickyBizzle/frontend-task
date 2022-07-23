import { Box, Divider, Image, LinkBox, Text, Link as ChakraLink, Flex, Button } from "@chakra-ui/react"
import Link from "next/link"
import { TiCamera, TiCameraOutline } from 'react-icons/ti'
import { constants } from "utils/constants"
import { NavLink } from "./NavLink"
import { destroyCookie } from 'nookies'
import { useRouter } from "next/router"

export const Sidebar = () => {
  const router = useRouter()
  const logout = () => {
    destroyCookie(null, 'userId')
    destroyCookie(null, 'orgId')
    router.push('/login')
  }
  return (
    <Flex w="255px" h="100%" bgGradient="linear(to-b, blue.900, blue.800)" p={4} flexDirection="column" justifyContent="space-between">
      <Box>
        <Link href='/' passHref>
          <ChakraLink>
            <Image src={constants.logo} alt={constants.logoAlt} objectFit="contain" objectPosition="left" p={4} />
          </ChakraLink>
        </Link>
        <Divider mt={4} mb={10} />

        <Text fontSize="xs" color="gray.200" fontWeight="bold" casing="uppercase" mb={2} pl={4}>
          {constants.sidebarNavHeader}
        </Text>
        <NavLink href="/devices" logo={TiCamera} activeLogo={TiCameraOutline}>
          {constants.deviceNavLink}
        </NavLink>
      </Box>
      <Box>
        <Button colorScheme="blue" w="100%" onClick={logout}>
          {constants.logoutBtn}
        </Button>
      </Box>
    </Flex>
  )
}
