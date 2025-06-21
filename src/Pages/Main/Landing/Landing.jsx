import './Landing.css'
import logo from '/assets/images/logo.png'
import giveHeart from '/assets/images/giveHeart.jpg'

const Landing = () => {
  return (
    <main className='flex flex-col'>
      <header className='header h-20 flex items-center justify-between px-1 sm:px-4 shadow shadow-gray-700 sticky -top-[10px]'>
        <div className='flex items-center justify-center text-2xl'>
          <img src={logo} width={50} height={50} />
          <p>Givers</p>
        </div>
        <div className='flex space-x-2'>
          <button className='px-4 py-2 bg-gray-800 rounded-lg text-white'>Login</button>
          <button className='px-4 py-2 bg-gray-800 rounded-lg text-white'>Sign Up</button>
        </div>
      </header>
      <section className={`bg-[url(/assets/images/giveHeart.jpg)] bg-cover bg-center h-screen flex items-center justify-center`}>
        <div className='flex flex-col items-center justify-center py-16'>
          <h1 className='text-8xl font-bold mb-4'>Givers</h1>
        </div>
      </section>
      <section className='text-gray-800 flex flex-col items-center justify-center py-16'>
        <div className='flex flex-col items-center justify-center text-center p-16 lg:w-5xl'>
          <h2 className='text-4xl lg:text-7xl font-bold mb-4'>Transform Unused Items Into <span className='bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 text-transparent'>Community Treasures</span></h2>
          <p className='text-lg text-gray-600 mb-8'>Join a community where giving meets receiving. Share items you no longer need with those who can use them. Free, sustainable, and meaningful.</p>
          <div className='flex space-x-4'>
            <button className='px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-full hover:scale-105 transition-all duration-300 cursor-pointer font-semibold'>Start Giving</button>
            <button className='px-6 py-3 border-2 border-green-600 text-green-600 rounded-full hover:scale-105 hover:bg-green-600 hover:text-white transition-all duration-400 cursor-pointer font-semibold'>Find Item</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing;
