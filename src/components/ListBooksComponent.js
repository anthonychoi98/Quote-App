import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';
import BookItem from './pages/BookItem';

class ListBooksComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.books) {

            var books = this.props.books.map(JSON.parse);
            
            //console.log('book is : ', book);
            return books.map((book, key) => (
                <BookItem key={key} book={book} delBook={this.props.delBook} />
            ));
        }
        else{
            return <h1>nothing</h1>;
        }
    }

}

ListBooksComponent.propTypes = {
    books: PropTypes.array.isRequired,
    delBook: PropTypes.func.isRequired,
  }

export default ListBooksComponent;