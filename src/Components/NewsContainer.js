import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsContainer extends Component {
    constructor() {
        super();
        console.log("in cons");
        this.state = {
            articles: [],
            loading: false
        }
    }
    // runs after render()
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=5a267e71ace440edbbaeb258a28fdee2";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles});
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
        </div>
        )
    }
}

export default NewsContainer
