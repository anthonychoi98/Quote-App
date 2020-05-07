import React, { Component }from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Auth from './components/auth.js'
import QuotesPage from './components/pages/QuotesPage';
import CameraPage from './components/pages/CameraPage';

const auth = new Auth();

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.loggedIn()) {
          console.log('get the username:', auth.getProfile().sub)
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


/// CREATE NEW TABLE FOR EACH BOOK/AUTHOR, THEN IN EACH TABLE YOU START ADDING QUOTES....

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />    
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" exact component = {LoginPage}/>
              <Route path="/registration" exact component = {RegistrationPage}/> 
              <ProtectedRoute exact path='/landing' component={LandingPage} />
              <ProtectedRoute exact path='/quotes' component={QuotesPage} />
              <Route path='/about' component={About}/>
              <Route path='/camera' component={CameraPage}/>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }



}

export default App;
