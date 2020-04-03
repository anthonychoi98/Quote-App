import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class QuoteItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.quote.completed ? 'line-through' : 'none'
    }
  }

  render() {
    const { id, title } = this.props.quote;
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}

          { this.props.quote.title }
          { this.props.quote.quote }
          { this.props.quote.chapter }
          { this.props.quote.comment }

          <button onClick={this.props.delQuote.bind(this, id)} style={btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

//error is from proptypes... quote is a string ?

//Objects are not valid as a React child (found: object with keys {id, title, completed}). If you meant to render a collection of children, use an array instead.

// PropTypes
QuoteItem.propTypes = {
  quote: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delQuote: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default QuoteItem