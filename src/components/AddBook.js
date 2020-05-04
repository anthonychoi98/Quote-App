import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppDataService from './AppDataService';
import {withRouter} from 'react-router-dom';
import Auth from './auth.js';

export class AddBook extends Component {

  constructor(props) {
    super(props)
    this.Auth = new Auth();
    this.state = {
        title: '',
        author: '',
        username: this.Auth.getProfile().sub
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
}

  
  onSubmit = (e) => {
    e.preventDefault();
    const q = this.state;
    this.props.addBook(q.title, q.author, q.username);
    this.setState({ title: '' , author: ''});
    AppDataService.insertBook(q);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Book ..." 
          value={this.state.title}
          onChange={this.onChange}
        />
        <input 
          type="text" 
          name="author" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Author ..." 
          value={this.state.author}
          onChange={this.onChange}
        />
        
        <input 
          type="submit" 
          value="Submit" 
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
AddBook.propTypes = {
  addBook: PropTypes.func.isRequired
}

export default withRouter(AddBook);