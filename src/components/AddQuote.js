import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppDataService from './AppDataService';
import {withRouter} from 'react-router-dom';
import Auth from './auth.js'

export class AddQuote extends Component {

  constructor(props) {
    super(props)
//need to add title and author from the landing page...
    this.state = {
        title: '',
        author: '',
        quote: '',
        chapter: '',
        comment: '',
        username: ''
    }
    this.Auth = new Auth();
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
}
//maybe just include props.state.title in obSUbmit()
componentDidMount(){
  if(this.props.location.state){
   this.setState({
        title: this.props.location.state.state.title,
        author: this.props.location.state.state.author,
        username: this.Auth.getProfile().sub
     })
   }
  }

  
  onSubmit = (e) => {
    e.preventDefault();
    this.componentDidMount();
    const q = this.state;
    this.props.addQuote(q.title, q.author, q.quote, q.chapter, q.comment, q.username);
    
    this.setState({ quote: '', chapter: '', comment: ''});
    AppDataService.insertQuote(q);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  //no title or author... just comment
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        {/* <table>
          <tr>
              <td>Add Quote:</td>
              <td><input type="text" name="quote" style={{ flex: '10', padding: '5px' }} value={this.state.quote}
              onChange={this.onChange} placeholder="QUOTE..."/></td>
          </tr>
          <tr>
              <td>Add Chapter:</td>
              <td><input type="text" name="chapter" style={{ flex: '10', padding: '5px' }} value={this.state.chapter}
              onChange={this.onChange} placeholder="CHAPTER..."/></td>
          </tr>
          <tr>
              <td>Add Comment:</td>
              <td><input type="text" name="comment" style={{ flex: '10', padding: '5px' }} value={this.state.comment}
              onChange={this.onChange} placeholder="COMMENT..."/></td>
          </tr>
          </table> */}
      <div id='body' style={{width:'100%'}} >
        <input 
          type="text" 
          name="quote" 
          style={{ flex: '10', padding: '5px'}}
          placeholder="Add Quote ..." 
          value={this.state.quote}
          onChange={this.onChange}
        />
        </div>
        <div style={{width:'100%'}}>
        <input 
          type="text" 
          name="chapter" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Chapter ..." 
          value={this.state.chapter}
          onChange={this.onChange}
        />
      </div>
        <input 
          type="text" 
          name="comment" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Annotation ..." 
          value={this.state.comment}
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