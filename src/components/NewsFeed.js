import React, {useEffect, useState} from 'react';

const defaultNews = {
    status: "ok",
    totalResults: 0,
    articles: []
}

const NewsFeed = () => {
    const [news, setNews] = useState(defaultNews);
    const [page, setPage] = useState(1);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    const handleRefresh = () => {
        setNews(defaultNews)
        setPage(1)
        setIsloading(false)
        setIsRefresh(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_NEWSAPI_URL}&page=${page}`)  
            const result = await response.json()
            console.log(result)
            setIsloading(true)
            try {
                setNews(current => {
                   return ({
                       ...result,
                       status: result.status,
                       totalResults: result.totalResults,
                       articles: [...current.articles,...result.articles]
                   })
                })
                if (result.status !== "ok") {
                    throw new Error("Error")
                }
            } catch (error) {
                setIsError(true)
            }
            setIsloading(false)
        }

        fetchData()        
    })

    return (
        <div className="">
            <p className="text-2xl font-bold text-center">
                Top News Headline
            </p>

            {isLoading && <p>Loading ...</p>}
            {isError && <p>Sorry, ada error cuy</p>}
            
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        news.articles.map((item, index) => (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {item.title} </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="flex justify-center items-center">
                {
                    news.articles.length < parseInt(news.totalResults) ? 
                    <button onClick={() => setPage(c => c + 1)} disabled={isLoading} className="bg-gray-800 hover:bg-gray-900 text-teal-400 hover:shadow-lg hover:outline-none focus:outline-none transition-all duration-500 ease-in-out py-4 px-6 m-3 rounded-full">Load More</button>
                    : 
                    null
                }
                <button onClick={handleRefresh} disabled={isLoading} className="bg-gray-800 hover:bg-gray-900 text-teal-400 hover:shadow-lg hover:outline-none focus:outline-none transition-all duration-500 ease-in-out py-4 px-6 m-3 rounded-full">Refresh</button>
            </div>
        </div>
    );
}

export default NewsFeed;
