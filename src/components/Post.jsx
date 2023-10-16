import { useState, useEffect } from "react"
import { loader, tick, copy } from "../assets"
import { useSummarizeTextMutation } from "../services/article"

const Post = () => {

    const [paragraph, setParagraph] = useState({
        text: '',
        summary: ''
    })
    const [allParagraphs, setAllParagraphs] = useState([])
    const [copyText, setCopyText] = useState("")

    const [summarizeText, { error, isFetching }] = useSummarizeTextMutation()

    useEffect(() => {
        const paragraphsFromLocalStorage = JSON.parse(localStorage.getItem('paragraphs'))

        if (paragraphsFromLocalStorage) {
            setAllParagraphs(paragraphsFromLocalStorage)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await summarizeText({text: paragraph.text})
        console.log(response)

        // if(data?.summary) {
        //     const newParagraph = {...paragraph, summary: data.summary}
        //     const updatedAllParagraphs = [...allParagraphs, newParagraph]
        //     setParagraph(newParagraph)
        //     setAllParagraphs(updatedAllParagraphs)

        //     localStorage.setItem('paragraphs', JSON.stringify(updatedAllParagraphs))
        // }
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopyText(text)
        setTimeout(()=>setCopyText(""),3000)
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            <div className="flex flex-col w-full gap-2">
                <form
                    className="relative flex justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <textarea 
                        className="url_input peer"
                        onChange={(e) => setParagraph({...paragraph, text: e.target.value})}
                        name="text" id="text" cols="30" rows="10"></textarea>
                    <button
                        type="submit"
                        className="black_btn peer ms-3"
                    >
                        👍 
                    </button>
                </form>

                {/* Summary History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allParagraphs.map((paragraph, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-950 rounded-md"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-400 text-xs">{paragraph.text}</p>
                                <p className="text-gray-400 text-xs">{paragraph.summary}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="black_btn"
                                    onClick={() => handleCopy(paragraph.summary)}
                                >
                                    {copyText === paragraph.summary ? (
                                        <img src={tick} alt="tick" className="w-4" />
                                    ) : (
                                        <img src={copy} alt="copy" className="w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Display Results */}
                <div className="my-10 max-w-full flex justify-center items-center">
                    {isFetching ? (
                        <img src={loader} alt="loader" 
                            className="w-20 h-20 object-contain" />
                    ) : error ? (
                        <p className='font-inter font-bold text-black text-center'>
                            Ooopsies, that was embarrasing. Please try again later.
                            <br />
                            <span className='font-satoshi font-normal text-red-600'>
                                {error?.data?.error}
                            </span>
                        </p>
                    ) : (
                        paragraph.summary && (
                            <div className="flex flex-col gap-3">
                                <h2 className="font-satoshi font-bold text-white text-xl">
                                    Paragraph <span className="text-teal-700">
                                        Summary
                                    </span>
                                </h2>

                                <div className='summary_box'>
                                    <p className='font inter font-medium text-sm text-white'>{paragraph.summary}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    )
}

export default Post
