export default defineEventHandler(async (event) => {
  const body = await readBody<{
    provider?: 'gmail' | 'yahoo'
    code?: string
    redirectUri?: string
  }>(event)

  if (!body?.provider || !body.code || !body.redirectUri) {
    throw createError({ statusCode: 400, statusMessage: 'Missing OAuth parameters' })
  }

  if (body.provider !== 'gmail' && body.provider !== 'yahoo') {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported OAuth provider' })
  }

  const config = useRuntimeConfig()
  const isGmail = body.provider === 'gmail'
  const clientId = isGmail ? config.public.gmailClientId : config.public.yahooClientId
  const clientSecret = isGmail ? config.gmailClientSecret : config.yahooClientSecret

  if (!clientId || !clientSecret) {
    throw createError({ statusCode: 500, statusMessage: 'OAuth is not configured' })
  }

  const tokenUrl = isGmail
    ? 'https://oauth2.googleapis.com/token'
    : 'https://api.login.yahoo.com/oauth2/get_token'

  const tokenData = await $fetch<{ access_token?: string }>(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: body.code,
      grant_type: 'authorization_code',
      redirect_uri: body.redirectUri,
    }).toString(),
  })

  if (!tokenData.access_token) {
    throw createError({ statusCode: 401, statusMessage: 'Failed to get access token' })
  }

  return { access_token: tokenData.access_token }
})
