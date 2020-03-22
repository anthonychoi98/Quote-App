import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddQuote extends Component {
  state = {
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addQuote(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Quote ..." 
          value={this.state.title}
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

export default AddQuote