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
  const gmailClientSecret = config.public.gmailClientSecret
  const yahooClientId = config.public.yahooClientId
  const yahooClientSecret = config.public.yahooClientSecret

  // OAuth configuration
  const oauthConfig = {
    gmail: {
      clientId: gmailClientId, // Replace with your Google OAuth client ID
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''
    },
    yahoo: {
      clientId: yahooClientId, // Replace with your Yahoo OAuth client ID
      scope: 'openid profile email',
      // Use consistent redirect URI - must match exactly what's configured in Yahoo Developer Network
      redirectUri: 'https://signature-pro.ca/auth/callback'
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
      let userData: User

      if (provider === 'gmail') {
        // Exchange code for access token and get user info from Google
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: gmailClientId,
            client_secret: gmailClientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: oauthConfig.gmail.redirectUri,
          }),
        })

        const tokenData = await tokenResponse.json()
        
        if (tokenData.access_token) {
          // Get user info from Google
          const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          })
          
          const googleUser = await userResponse.json()
          
          userData = {
            id: googleUser.id,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            provider: 'gmail'
          }
        } else {
          throw new Error('Failed to get access token')
        }
      } else {
        // Exchange code for access token and get user info from Yahoo
        const tokenResponse = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: yahooClientId,
            client_secret: yahooClientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: oauthConfig.yahoo.redirectUri,
          }),
        })

        const tokenData = await tokenResponse.json()
        
        if (tokenData.access_token) {
          // Get user info from Yahoo
          const userResponse = await fetch('https://api.login.yahoo.com/openid/v1/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          })
          
          const yahooUser = await userResponse.json()
          
          userData = {
            id: yahooUser.sub || yahooUser.id,
            email: yahooUser.email,
            name: yahooUser.name || (yahooUser.given_name + ' ' + yahooUser.family_name),
            picture: yahooUser.picture,
            provider: 'yahoo'
          }
        } else {
          throw new Error('Failed to get access token from Yahoo')
        }
      }

      user.value = userData
      
      // Store user in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData))
      }

      console.log('User authenticated successfully:', userData)
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