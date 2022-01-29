import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
//https://lodash.com/
import { shuffle } from 'lodash'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  //to display user's photo at top we need ti get the session
  const { data: session } = useSession()
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  })

  return (
    <div className="flex-grow  text-white">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full   bg-red-400 p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            className="rouded-full h-10 w-10 "
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-64  items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <p>hello</p>
      </section>
    </div>
  )
}

export default Center
// to hide scrollbar : https://www.npmjs.com/package/tailwind-scrollbar-hide
