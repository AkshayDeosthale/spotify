import React, { useEffect } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { LOGIN_URL } from '../lib/spotify'

const Login = ({ providers }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-lg bg-[#18D860] p-5 text-white"
            onClick={() => {
              // signIn(provider.id, {
              //   callbackUrl: '/',
              // })
              window.location.href = LOGIN_URL
            }}
          >
            login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

//This will fetch the props first every time user comes to this page
//this is server side render

//if it says object has null value then you have not imported the providers in props,
//click behind providers and cntrl+space , it will not show but it will import
export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

//https://www.youtube.com/watch?v=3xrko3GpYoU&t=13s : 1:29:00
