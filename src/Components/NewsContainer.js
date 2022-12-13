import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class NewsContainer extends Component {

    static defaultProps = {
        pageSize: 18,
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
        console.log("in cons");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // runs after render()
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
    }
    onPrevBtnClick = async () => {
        console.log('prev');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, page: this.state.page-1, loading:false});
    }
    onNextBtnClick = async () => {
        console.log('next');
        // if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, page: this.state.page+1, loading:false});
        // }
    }

    render() {
        return (
            <div className='container' style={{width:"90%"}}>
            <h3 className="my-3 text-center">Today's News Astras</h3>
            {this.state.loading && <Spinner />}
            {!this.state.loading && <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,65):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
                })}
            </div>}
            <div className="d-flex justify-content-between my-3">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.onPrevBtnClick}>&larr; Previous</button>
                <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.onNextBtnClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default NewsContainer
