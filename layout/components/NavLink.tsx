import { Icon, Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import Link from "next/link"
import { useRouter } from "next/router";


type NavLinkProps = {
  children: React.ReactNode;
  href: string
  logo: React.ReactNode
  activeLogo: React.ReactNode
}

export const NavLink = ({ children, href, logo, activeLogo }) => {
  const router = useRouter()
  const isActive = router.asPath.includes(href)
  return <Link href={href} passHref>
    <ChakraLink>
      <Flex color={isActive ? "white" : "blue.500"} bg={isActive ? "blue.700" : ''} px={4} py={2} borderRadius={8} display="flex" alignItems="center" experimental_spaceX={4}>
        <Icon as={isActive ? activeLogo : logo} h="32px" />
        <Text>
          {children}
        </Text>
      </Flex>
    </ChakraLink>
  </Link>
}