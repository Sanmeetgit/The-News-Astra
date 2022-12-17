import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';

export class NewsContainer extends Component {

    static defaultProps = {
        pageSize: 15,
        country: "in",
        category: "general"
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    };

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            progress: 0
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(pageNo) {
        if (window.location.pathname !== '/') {
            document.title = `News Astra - ${this.capitalizeFirstLetter(this.props.category)}`
        }

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.setState({ progress: 30 })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ progress: 100 })
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    // runs after render()
    async componentDidMount() {
        this.updateNews(this.state.page);
    }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, page: this.state.page + 1 });
    }

    render() {
        return (
            <div className='container'>
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    onLoaderFinished={() => this.setState({ progress: 0 })}
                />
                <h3 className="my-3 text-center">Today's News Astras - Top {this.capitalizeFirstLetter(this.props.category)} Headings</h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row" style={{
                            width:"95%",
                            margin: "0px auto"
                        }}>
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <NewsItem title={element.title} description={element.description ? element.description.slice(0, 65) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} sourceName={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default NewsContainer;
