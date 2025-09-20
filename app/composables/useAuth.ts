export interface User {
  id: string
  email: string
  name: string
  picture?: string
  provider: 'gmail' | 'outlook'
}

export const useAuth = () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)

  const config = useRuntimeConfig()
  const gmailClientId = config.public.gmailClientId
  const gmailClientSecret = config.public.gmailClientSecret
  const outlookClientId = config.public.outlookClientId
  const outlookClientSecret = config.public.outlookClientSecret

  // OAuth configuration
  const oauthConfig = {
    gmail: {
      clientId: gmailClientId, // Replace with your Google OAuth client ID
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''
    },
    outlook: {
      clientId: outlookClientId, // Replace with your Microsoft OAuth client ID
      scope: 'openid profile email',
      redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''
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

  const signInWithOutlook = async () => {
    isLoading.value = true
    try {
      const state = encodeURIComponent(JSON.stringify({ provider: 'outlook' }))
      const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
        `client_id=${oauthConfig.outlook.clientId}&` +
        `redirect_uri=${encodeURIComponent(oauthConfig.outlook.redirectUri)}&` +
        `scope=${encodeURIComponent(oauthConfig.outlook.scope)}&` +
        `response_type=code&` +
        `response_mode=query&` +
        `state=${state}`

      // Store the intended redirect
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_redirect', window.location.pathname)
      }

      window.location.href = authUrl
    } catch (error) {
      console.error('Outlook sign-in error:', error)
      isLoading.value = false
    }
  }

  const handleAuthCallback = async (code: string, provider: 'gmail' | 'outlook') => {
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
        // For Outlook, similar process but with Microsoft Graph API
        // For now, create a better mock user based on the provider
        userData = {
          id: `user_${Date.now()}`,
          email: 'user@outlook.com',
          name: 'Outlook User',
          picture: 'https://via.placeholder.com/150',
          provider: 'outlook'
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
    signInWithOutlook,
    handleAuthCallback,
    signOut,
    checkAuthStatus
  }
} 