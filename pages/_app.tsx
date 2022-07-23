import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/theme'
import { useGetSession } from 'hooks/useGetSession'
import { AppShell } from 'layout/AppShell'


function MyApp({ Component, pageProps }: AppProps) {
  const { userId, orgId } = useGetSession()

  return (
    <ChakraProvider theme={theme}>
      {userId && orgId && <AppShell>
        <Component {...pageProps} />
      </AppShell>}
      {!userId && !orgId && <Component {...pageProps} />}
    </ChakraProvider>)
}

export default MyApp
