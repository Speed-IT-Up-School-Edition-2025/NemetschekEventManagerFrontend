import { useUserStore } from '@/stores/userStore'

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const store = useUserStore()
  const headers: Record<string, string> = {
    ...(init.headers as Record<string, string> || {}),
    ...(store.accessToken ? { Authorization: `Bearer ${store.accessToken}` } : {}),
  }

  let res = await fetch(input, { ...init, headers })

  if (res.status === 401 && store.refreshToken) {
    const ok = await store.refreshAccessToken()
    if (ok) {
      headers.Authorization = `Bearer ${store.accessToken}`
      res = await fetch(input, { ...init, headers })
    }
  }

  return res
}
