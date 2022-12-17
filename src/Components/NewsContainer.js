import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

const NewsContainer = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [progress, setProgress] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async (pageNo) => {
        if (window.location.pathname !== '/') {
            document.title = `News Astra - ${capitalizeFirstLetter(props.category)}`
        }

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
        setLoading(true);
        setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        setProgress(100);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    useEffect(() => {
        updateNews(page);
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setPage(page + 1);
    }

    return (
        <div className='container' style={{ width: "100%" }}>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <h3 className="my-3 text-center">Today's News Astras - Top {capitalizeFirstLetter(props.category)} Headings</h3>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-2" key={element.url}>
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 65) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} sourceName={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}

NewsContainer.defaultProps = {
    pageSize: 15,
    country: "in",
    category: "general"
}
NewsContainer.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
};

export default NewsContainer;
