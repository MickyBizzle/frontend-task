import { simulateDelay } from 'utils/simulateDelay'

export async function login(userId: string, orgId: string) {
  await simulateDelay(1500)
  if (!userId || !orgId) {
    throw new Error('User ID and Organisation ID are required')
  }
  return 'Success'
}
