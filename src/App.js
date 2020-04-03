import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { render } from '@testing-library/react';
import Header from './components/layout/Header';
import AddQuote from './components/AddQuote';
import QuoteItem from './components/QuoteItem';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';
import AddBook from './components/AddBook';
import CameraComponent from './components/CameraComponent'
import ListQuotesComponent from './components/ListQuotesComponent'
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import HomePage from "./components/pages/HomePage";
import './App.css';
import { toUnicode } from 'punycode';
import AppDataService from './components/AppDataService';
 

/// CREATE NEW TABLE FOR EACH BOOK/AUTHOR, THEN IN EACH TABLE YOU START ADDING QUOTES....

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route path="/" exact component = {HomePage}/>
            <Route path="/login" exact component = {LoginPage}/>
            <Route path="/landing" exact component = {LandingPage}/>
            <Route path="/registration" exact component = {RegistrationPage}/>

            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
