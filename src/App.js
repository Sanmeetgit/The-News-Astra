import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import NewsContainer from './Components/NewsContainer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  render() {
    return (
      <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<NewsContainer apiKey={this.apiKey} key="general" pageSize={15} country={"in"} category={"general"}/>} />
          <Route exact path="/general" element={<NewsContainer apiKey={this.apiKey} key="general" pageSize={15} country={"in"} category={"general"}/>} />
          <Route exact path="/business" element={<NewsContainer apiKey={this.apiKey} key="business" pageSize={15} country={"in"} category={"business"}/>} />
          <Route exact path="/entertainment" element={<NewsContainer apiKey={this.apiKey} key="entertainment" pageSize={15} country={"in"} category={"entertainment"}/>} />
          <Route exact path="/health" element={<NewsContainer apiKey={this.apiKey} key="health" pageSize={15} country={"in"} category={"health"}/>} />
          <Route exact path="/science" element={<NewsContainer apiKey={this.apiKey} key="science" pageSize={15} country={"in"} category={"science"}/>} />
          <Route exact path="/sports" element={<NewsContainer apiKey={this.apiKey} key="sports" pageSize={15} country={"in"} category={"sports"}/>} />
          <Route exact path="/technology" element={<NewsContainer apiKey={this.apiKey} key="technology" pageSize={15} country={"in"} category={"technology"}/>} />
        </Routes>
      </Router>
    )
  }
}
