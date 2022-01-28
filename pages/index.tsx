import Head from 'next/head'
import Sidebar from '../Components/Sidebar'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main>
        <Sidebar />
        {/*<Center />*/}
      </main>
      <div>{/*<Footer></Footer>*/}</div>
    </div>
  )
}
