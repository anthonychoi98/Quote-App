import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class QuoteItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
    }
  }

  render() {
    const { title, author, chapter, quote, comment } = this.props.quote;
    return (
      <div style={this.getStyle()}>
        <p>
          <div>
          <p>Chapter { this.props.quote.chapter } </p>
          </div>
          <div>
          <p>Quote:  { this.props.quote.quote }</p>
          <button onClick={this.props.delQuote.bind(this, title, author, chapter, quote, comment)} style={btnStyle}>x</button>
          </div>
          <div>
          <p>Comment: { this.props.quote.comment } </p>
          </div>
        </p>
        

      </div>
    )
  }
}

// PropTypes
QuoteItem.propTypes = {
  quote: PropTypes.object.isRequired,
  delQuote: PropTypes.func.isRequired
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