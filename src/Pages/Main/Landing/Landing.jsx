import './Landing.css'

const Landing = () => {
  return (
    <main>
      <header className='h-20 flex items-center justify-between px-4 bg-gray-800 text-white'>
        <div>
          <h1>Logo</h1>
        </div>
        <nav>
          <ul className='flex space-x-4 *:hover:underline transition-all duration-300'>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className='flex space-x-2'>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </header>
      <section>

      </section>
    </main>
  )
}

export default Landing;
