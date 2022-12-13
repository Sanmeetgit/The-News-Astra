import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import NewsContainer from './Components/NewsContainer';

export default class App extends Component {
  // 5a267e71ace440edbbaeb258a28fdee2
  render() {
    return (
      <>
      <Navbar />
      <NewsContainer pageSize={18} />
      </>
    )
  }
}
