import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsContainer extends Component {
    constructor() {
        super();
        console.log("in cons");
        this.state = {
            articles: [],
            loading: false,
            pageSize: 18,
            page: 1
        }
    }

    // runs after render()
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }
    onPrevBtnClick = async () => {
        console.log('prev');
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, page: this.state.page-1});
    }
    onNextBtnClick = async () => {
        console.log('next');
        if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.state.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5a267e71ace440edbbaeb258a28fdee2&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, page: this.state.page+1});
        }
    }

    render() {
        return (
            <div className='container'>
            <h3 className='my-2'>Today's News Astras</h3>
            <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,65):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
                })}
            </div>
            <div className="d-flex justify-content-between my-3">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.onPrevBtnClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.onNextBtnClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default NewsContainer
