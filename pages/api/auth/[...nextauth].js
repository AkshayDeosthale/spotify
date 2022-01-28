import NextAuth from 'next-auth'

import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyAPI, { LOGIN_URL } from '../../../lib/spotify'

//Got below details from - https://next-auth.js.org/tutorials/refresh-token-rotation

async function refreshAccessToken(token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken)
    spotifyAPI.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyAPI.refreshAccessToken()
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      //1 hour as 3600 is returened from spotify api
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,

      //replace if new one came back else fall back to old refresh token
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //initial sign in
      if (account && user) {
        console.log('in JWT')
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_in * 1000,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log('refresh token is valid')
        return token
      }
      //else Access token has expired, try to update it
      console.log('refresh token is expired,refreshing')
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.refreshToken = token.refreshToken
      session.user.accessToken = token.accessToken
      session.user.user = token.username

      return session
    },
  },
})

//Got below details from - https://next-auth.js.org/tutorials/refresh-token-rotation
