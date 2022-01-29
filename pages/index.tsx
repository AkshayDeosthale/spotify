import Head from 'next/head'
import Sidebar from '../Components/Sidebar'
import Center from '../Components/Center'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/*<Footer></Footer>*/}</div>
    </div>
  )
}
//https://www.youtube.com/watch?v=3xrko3GpYoU&t=13s   : 1:50:00
