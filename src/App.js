import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { render } from '@testing-library/react';
import Header from './components/layout/Header';
import Quotes from './components/Quotes';
import AddQuote from './components/AddQuote';
import QuoteItem from './components/QuoteItem';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';
import CameraComponent from './components/CameraComponent'
import ListQuotesComponent from './components/ListQuotesComponent'

import './App.css';
import { toUnicode } from 'punycode';
 
class App extends Component {
  state = {
    quotes: []
  };

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/quotes?_limit=10')
      .then(res => this.setState({ quotes: res.data }));
  }

  markComplete = id => {
    this.setState({
      quotes: this.state.quotes.map(quote => {
        if (quote.id === id) {
          quote.completed = !quote.completed;
        }
        return quote;
      })
    });
  };

  // Delete Quote
  delQuote = id => {
      this.setState( {quotes: [... this.state.quotes.filter(quote => quote.id != id) ]})
  };

  // Add Todo
  addQuote = (title) => {
    const newQuote = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState( {quotes: [... this.state.quotes, newQuote ] });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddQuote addQuote={this.addQuote} />
                  <Quotes
                    quotes={this.state.quotes}
                    markComplete={this.markComplete}
                    delQuote={this.delQuote}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={ListQuotesComponent} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
