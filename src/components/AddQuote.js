import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppDataService from './AppDataService';
import {withRouter} from 'react-router-dom';

export class AddQuote extends Component {

  constructor(props) {
    super(props)

    this.state = {
        title: '',
        author: '',
        quote: '',
        chapter: '',
        comment: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
}

  
  onSubmit = (e) => {
    e.preventDefault();
    const q = this.state;
    this.props.addQuote(q.title, q.author, q.quote, q.chapter, q.comment);
    this.setState({ title: '' , author: '', quote: '', chapter: '', comment: ''});

    AppDataService.insertQuote(q).then(() => this.props.history.push("/addQuote"));
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Title ..." 
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
          type="text" 
          name="quote" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Quote ..." 
          value={this.state.quote}
          onChange={this.onChange}
        />
        <input 
          type="text" 
          name="chapter" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Chapter ..." 
          value={this.state.chapter}
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
AddQuote.propTypes = {
  addQuote: PropTypes.func.isRequired
}

export default withRouter(AddQuote);