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
  render() {
    return (
      <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<NewsContainer key="general" pageSize={15} country={"in"} category={"general"}/>} />
          <Route exact path="/general" element={<NewsContainer key="general" pageSize={15} country={"in"} category={"general"}/>} />
          <Route exact path="/business" element={<NewsContainer key="business" pageSize={15} country={"in"} category={"business"}/>} />
          <Route exact path="/entertainment" element={<NewsContainer key="entertainment" pageSize={15} country={"in"} category={"entertainment"}/>} />
          <Route exact path="/health" element={<NewsContainer key="health" pageSize={15} country={"in"} category={"health"}/>} />
          <Route exact path="/science" element={<NewsContainer key="science" pageSize={15} country={"in"} category={"science"}/>} />
          <Route exact path="/sports" element={<NewsContainer key="sports" pageSize={15} country={"in"} category={"sports"}/>} />
          <Route exact path="/technology" element={<NewsContainer key="technology" pageSize={15} country={"in"} category={"technology"}/>} />
        </Routes>
      </Router>
    )
  }
}
