import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import spotifyAPI from '../lib/spotify'

const Sidebar = () => {
  const spotify = useSpotify()
  //session is declared in _app.tsx
  const { data: session, status } = useSession()

  //playlist
  const [playlists, setPlaylists] = useState([])
  const [me, setMe] = useState({})
  //when my sidebar mouts, my use effect should do this
  useEffect(async () => {
    console.log(spotify)
    spotify.getAccessToken()

    try {
      let meTemp = await spotify.getMe()
      setMe(meTemp)
    } catch (err) {
      console.error(err)
    }

    if (spotify.getAccessToken()) {
      spotify.getUserPlaylists().then((data) => {
        console.log(data)
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotify])

  useEffect(() => console.log(me), [me])
  console.log(playlists)

  return (
    <div className="h-screen  space-y-4 overflow-y-scroll border-r border-black p-5 text-sm text-gray-500 scrollbar-hide ">
      <button
        className="flex items-center space-x-2  hover:text-white"
        onClick={() => signOut()}
      >
        <HomeIcon className="h-5 w-5" />
        <p>log out</p>
      </button>
      <div className="space-y-4">
        <button className="flex items-center space-x-2  hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>

      <div className="space-y-4">
        <button className="flex items-center space-x-2  hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        {/* ======= playlist =================*/}
        {playlists.map((playlist) => (
          <p key={playlist.id} className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
