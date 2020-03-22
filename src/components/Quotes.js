import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';


class Quotes extends Component {
    
  render() {
    return this.props.quotes.map((quote) => (
      <QuoteItem key={quote.id} quote={quote} markComplete={this.props.markComplete} delQuote={this.props.delQuote} />
    ));
  }
}

// PropTypes
Quotes.propTypes = {
  quotes: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delQuote: PropTypes.func.isRequired,
}

export default Quotes;