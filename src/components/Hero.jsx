import { robot } from '../assets';


const Hero = () => {
    return (
        <header className='w-full flex justify-center items-center flex-col'>
            <nav className='flex justify-between items-center w-full mb-10 pt-3'>
                <img
                    className='w-28 bject-contain'
                    src={robot} alt="hii i'm ken" />

                <button
                    type='button'
                    onClick={() => console.log('clicked')}
                    className='black_btn'
                >
                    Github
                </button>
            </nav>

            <h1 className='head_text'>
                Summerize Articles with Ken <br className='max-md:hidden'/>
                <span className='text-sm text-gray-300'>powered by{" "}</span>
                <span className='orange_gradient'>OpenAI</span>
            </h1>

            <h2 className='desc'>
                Ken is a tool that uses the power of OpenAI to summarize articles into a few sentences.
            </h2>
        </header>
    )
}

export default Hero
