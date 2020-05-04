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
          { this.props.quote.chapter }
          { this.props.quote.quote }
          { this.props.quote.comment }

          <button onClick={this.props.delQuote.bind(this, title, author, chapter, quote, comment)} style={btnStyle}>x</button>
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