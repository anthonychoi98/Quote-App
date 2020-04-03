import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';

class ListQuotesComponent extends Component {

    render() {
        if (this.props.quotes) {
            console.log(this.props.quotes.map(JSON.parse));

            var quotes = this.props.quotes.map(JSON.parse);
            
            
            return quotes.map((quote) => (
                <QuoteItem key={quote.id} quote={quote} markComplete={this.props.markComplete} delQuote={this.props.delQuote} />
            ));
        }
        else{
            return <h1>nothing</h1>;
        }
    }

}

ListQuotesComponent.propTypes = {
    quotes: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delQuote: PropTypes.func.isRequired,
  }

export default ListQuotesComponent;