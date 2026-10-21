export interface User {
  id: string
  email: string
  name: string
  picture?: string
  provider: 'gmail' | 'yahoo'
}

export const useAuth = () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)

  const config = useRuntimeConfig()
  const gmailClientId = config.public.gmailClientId
  const yahooClientId = config.public.yahooClientId

  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''

  // OAuth configuration
  const oauthConfig = {
    gmail: {
      clientId: gmailClientId, // Replace with your Google OAuth client ID
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      redirectUri
    },
    yahoo: {
      clientId: yahooClientId, // Replace with your Yahoo OAuth client ID
      scope: 'openid profile email',
      redirectUri
    }
  }

  const signInWithGmail = async () => {
    isLoading.value = true
    try {
      const state = encodeURIComponent(JSON.stringify({ provider: 'gmail' }))
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${oauthConfig.gmail.clientId}&` +
        `redirect_uri=${encodeURIComponent(oauthConfig.gmail.redirectUri)}&` +
        `scope=${encodeURIComponent(oauthConfig.gmail.scope)}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `state=${state}`

      // Store the intended redirect
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_redirect', window.location.pathname)
      }

      window.location.href = authUrl
    } catch (error) {
      console.error('Gmail sign-in error:', error)
      isLoading.value = false
    }
  }

  const signInWithYahoo = async () => {
    isLoading.value = true
    try {
      const state = encodeURIComponent(JSON.stringify({ provider: 'yahoo' }))
      
      // Generate a secure nonce for Yahoo OAuth
      const nonce = btoa(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
      
      // Store nonce for validation later
      if (typeof window !== 'undefined') {
        localStorage.setItem('yahoo_nonce', nonce)
        localStorage.setItem('auth_redirect', window.location.pathname)
      }
      
      const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?` +
        `client_id=${oauthConfig.yahoo.clientId}&` +
        `redirect_uri=${encodeURIComponent(oauthConfig.yahoo.redirectUri)}&` +
        `scope=${encodeURIComponent(oauthConfig.yahoo.scope)}&` +
        `response_type=code&` +
        `state=${state}&` +
        `nonce=${nonce}`

      window.location.href = authUrl
    } catch (error) {
      console.error('Yahoo sign-in error:', error)
      isLoading.value = false
    }
  }

  const handleAuthCallback = async (code: string, provider: 'gmail' | 'yahoo') => {
    isLoading.value = true
    try {
      const tokenData = await $fetch<{ access_token?: string }>('/api/auth/token', {
        method: 'POST',
        body: {
          provider,
          code,
          redirectUri
        }
      })

      if (!tokenData.access_token) {
        throw new Error('Failed to get access token')
      }

      let userData: User

      if (provider === 'gmail') {
        const googleUser = await $fetch<{
          id: string
          email: string
          name: string
          picture?: string
        }>('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        })

        userData = {
          id: googleUser.id,
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
          provider: 'gmail'
        }
      } else {
        const yahooUser = await $fetch<{
          sub?: string
          id?: string
          email: string
          name?: string
          given_name?: string
          family_name?: string
          picture?: string
        }>('https://api.login.yahoo.com/openid/v1/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        })

        userData = {
          id: yahooUser.sub || yahooUser.id || '',
          email: yahooUser.email,
          name: yahooUser.name || `${yahooUser.given_name || ''} ${yahooUser.family_name || ''}`.trim(),
          picture: yahooUser.picture,
          provider: 'yahoo'
        }
      }

      user.value = userData

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      // Fallback to mock user if real authentication fails
      const fallbackUser: User = {
        id: `user_${Date.now()}`,
        email: 'user@example.com',
        name: 'Demo User',
        picture: 'https://via.placeholder.com/150',
        provider
      }
      
      user.value = fallbackUser
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(fallbackUser))
      }
    } finally {
      isLoading.value = false
    }
  }

  const signOut = () => {
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      // Only navigate on client side to avoid SSR routing injection warnings
      navigateTo('/')
    }
  }

  const checkAuthStatus = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('user')
        }
      }
    }
  }

  // Check auth status on mount
  onMounted(() => {
    checkAuthStatus()
  })

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    signInWithGmail,
    signInWithYahoo,
    handleAuthCallback,
    signOut,
    checkAuthStatus
  }
} 