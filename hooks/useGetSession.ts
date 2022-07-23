import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useGetSession() {
  const router = useRouter()
  const [userId, setUserId] = useState<string>()
  const [orgId, setOrgId] = useState<string>()

  useEffect(() => {
    const { userId: user, orgId: org } = parseCookies()
    setUserId(user)
    setOrgId(org)
  }, [router.asPath])

  return { userId, orgId }
}
