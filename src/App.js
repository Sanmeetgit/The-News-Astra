import './App.css';
import React from 'react'
import Navbar from './Components/Navbar';
import NewsContainer from './Components/NewsContainer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const pageSize = 15;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<NewsContainer apiKey={apiKey} key="general" pageSize={pageSize} country={"in"} category={"general"} />} />
        <Route exact path="/general" element={<NewsContainer apiKey={apiKey} key="general" pageSize={pageSize} country={"in"} category={"general"} />} />
        <Route exact path="/business" element={<NewsContainer apiKey={apiKey} key="business" pageSize={pageSize} country={"in"} category={"business"} />} />
        <Route exact path="/entertainment" element={<NewsContainer apiKey={apiKey} key="entertainment" pageSize={pageSize} country={"in"} category={"entertainment"} />} />
        <Route exact path="/health" element={<NewsContainer apiKey={apiKey} key="health" pageSize={pageSize} country={"in"} category={"health"} />} />
        <Route exact path="/science" element={<NewsContainer apiKey={apiKey} key="science" pageSize={pageSize} country={"in"} category={"science"} />} />
        <Route exact path="/sports" element={<NewsContainer apiKey={apiKey} key="sports" pageSize={pageSize} country={"in"} category={"sports"} />} />
        <Route exact path="/technology" element={<NewsContainer apiKey={apiKey} key="technology" pageSize={pageSize} country={"in"} category={"technology"} />} />
      </Routes>
    </Router>
  );
}

export default App;