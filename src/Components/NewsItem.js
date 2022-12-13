import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    let altImageUrl = "https://media.istockphoto.com/id/1219963993/photo/breaking-news-3d-rendering-virtual-set-studio-for-chroma-footage.jpg?b=1&s=170667a&w=0&k=20&c=XVN9kHO4zZ5ibyY5tvwN-kWY61RgFUr5mi8JznHMfSQ=";
    return (
        <div className="card">
            <img src={imageUrl?imageUrl:altImageUrl} className="card-img-top" alt="Breaking News" style={{width:"100%", height:"200px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
            </div>
      </div>
    )
  }
}

export default NewsItem
