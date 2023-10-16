import Hero from './components/Hero'
import Demo from './components/Demo'
import Post from './components/Post'
import { useState } from 'react'


const App = () => {

  const [isDemo, setIsDemo] = useState(true)

  return (
    <main>
      <div className='main bg-gray-950'>
        <div className='gradient'/>
      </div>

      <div className='app'>
        <Hero />
        {/* <button
          type='button'
          className='black_btn mt-6 font-satoshi'
          onClick={() => setIsDemo(!isDemo)}
        >
          Summarize {isDemo ? 'Text' : 'URL'}
        </button> */}
        {isDemo ? (
            <Demo />
        ) : (
          <Post />
        )}
      </div>
    </main>
  )
}

export default App
