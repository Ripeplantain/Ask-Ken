import { useState, useEffect } from 'react'

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'


const Demo = () => {

    const [ article, setArticle ] = useState({
        url: '',
        summary: ''
    })  
    const [allArticles, setAllArticles] = useState([])
    const [copyUrl, setCopyUrl] = useState("")

    const [ getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await getSummary({articleUrl: article.url})

        if(data?.summary) {
            const newArticle = {...article, summary: data.summary}
            const updatedAllArticles = [...allArticles, newArticle]
            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopyUrl(text)
        setTimeout(()=>setCopyUrl(""),3000)
    }

    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
                <form 
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}>
                    <img
                        className='absolute left-2 my-2'
                        src={linkIcon} alt="link" />
                    <input
                        type='url'
                        className='url_input peer'
                        placeholder='Enter an article link'
                        value={article.url}
                        required
                        onChange={(e) => setArticle({
                            ...article,
                            url: e.target.value
                        })}/>

                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
                    >
                        👍
                    </button>
                </form>

                {/* Browser URL History */}
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((article, index) => (
                        <div
                            key={index}
                            onClick={() => setArticle(article)}
                            className='link_card'
                        >
                            <div
                                onClick={() => handleCopy(article.url)}
                                className='copy_btn'>
                                <img
                                    className='w-[40%] h-[40%] object-contain'
                                    src={copyUrl ===  article.url ? tick : copy} alt="copy" />
                            </div>
                            <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                {article.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

                {/* Display Results */}
                <div className='my-10 max-w-full flex justify-center items-center'>
                    {isFetching ? (
                        <img 
                            className='w-20 h-20 object-contain'
                            src={loader} alt='loader' />
                    ) : error ? (
                        <p className='font-inter font-bold text-black text-center'>
                            Ooopsies, that was embarrasing. Please try again later.
                            <br />
                            <span className='font-satoshi font-normal text-red-600'>
                                {error?.data?.error}
                            </span>
                        </p>
                    ) : (
                        article.summary && (
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-satoshi font-bold text-white text-xl'>
                                    Article <span className='text-teal-700'>
                                        Summary
                                    </span>
                                </h2>

                                <div className='summary_box'>
                                    <p className='font inter font-medium text-sm text-white'>{article.summary}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
        </section>
    )
}

export default Demo
