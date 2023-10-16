import Hero from './components/Hero'
import Demo from './components/Demo'


const App = () => {
  return (
    <main>
      <div className='main bg-gray-950'>
        <div className='gradient'/>
      </div>

      <div className='app'>
        <Hero />
        <Demo />
      </div>
    </main>
  )
}

export default App
