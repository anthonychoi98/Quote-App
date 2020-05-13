import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import Popup from "reactjs-popup";

export class BookItem extends Component {

  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      buttonHovered: false,
      open: false,
      shade: '#f4f4f4'
    }
}

  getStyle = () => {
    return {
      background: this.state.shade,
      padding: '10px',
      borderBottom: '1px #ccc dotted'
    }
  }

  switchShade = () => {
    if(this.state.shade === '#f4f4f4'){
      this.setState({shade: 'lightblue'})
    }else{
      this.setState({shade: '#f4f4f4'})
    }
  }

  setButtonHovered = () => {

    this.setState({buttonHovered: !this.state.buttonHovered});
    this.switchShade();
  }
  

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  onClick = (props) => {
    this.setState({shade: '#93D5B4'})

    this.props.history.push('/quotes', {state: {title: this.props.book.title, 
                              author: this.props.book.author}});  

    }

    //should be deleting books based on id, not by name and author because you can delete duplicates. 
  render() {
    const { title, author } = this.props.book;
    return (
      <div style={this.getStyle()}>
        <label onClick={this.onClick} onMouseEnter={() => this.setButtonHovered()} 
  onMouseLeave={() => this.setButtonHovered()}>

      <b> { this.props.book.title }</b>
        </label>
        <div>
        <p>
          { this.props.book.author }
            <button onClick={this.openModal} style={btnStyle3}>X</button>
        </p>

        <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="modal">
              <a className="close" onClick={this.closeModal}>
                &times;
              </a>
              Removing a Book means removing all quotes and annotations saved in this book. If you are certain you would like to delete this book, click
              <button style={btnStyle} onClick={this.props.delBook.bind(this, title, author)}>'YA IM SURE'</button>
              <button style={btnStyle2} onClick={this.closeModal}> NVM </button>

            </div>
          </Popup>
        </div>
      </div>
    )
  }
}

//Objects are not valid as a React child (found: object with keys {id, title, completed}). If you meant to render a collection of children, use an array instead.

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  delBook: PropTypes.func.isRequired
}

const btnStyle2 = {
  background: '#93D5B4',
  color: '#GGG',
  border: 'none',
  padding: '5px 9px',
  margin: '15px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}
const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  margin: '15px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}
const btnStyle3 = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default withRouter(BookItem);