import SpotifyWebApi from 'spotify-web-api-node'

//Scopes from spotify : https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-library-read',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-currently-played',
  'user-follow-read',
].join(',')

const params = {
  scopes: scopes,
}

const queryParamString = new URLSearchParams(params)
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyAPI
export { LOGIN_URL }
