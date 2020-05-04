import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';

class ListQuotesComponent extends Component {

    render() {
        if (this.props.quotes) {

            var quotes = this.props.quotes.map(JSON.parse);
            
            return quotes.map((quote, key) => (
                <QuoteItem key={key} quote={quote} delQuote={this.props.delQuote} />
            ));
        }
        else{
            return <h1>nothing</h1>;
        }
    }

}

ListQuotesComponent.propTypes = {
    quotes: PropTypes.array.isRequired,
    delQuote: PropTypes.func.isRequired
  }

export default ListQuotesComponent;