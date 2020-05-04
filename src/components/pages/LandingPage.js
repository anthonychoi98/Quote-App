import React from 'react';
import {Link} from "react-router-dom";
import {Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddBook from '../AddBook';
import ListQuotesComponent from '../ListQuotesComponent'
import uuid from 'uuid';
import AppDataService from '../AppDataService';
import AddQuote from '../AddQuote';
import Auth from '../auth.js'
import ListBooksComponent from '../ListBooksComponent';


class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.getQueryVariable = this.getQueryVariable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.Auth = new Auth();
        this.helloWorld = this.helloWorld.bind(this);
      }

    state = {
        books: []
      };
    
      componentDidMount() {
            this.refreshBooks();
        }
    
        refreshBooks() {
          console.log("refreshing");
            AppDataService.retrieveAllBooks()
                .then(
                    response => {
                        console.log('res here',response);
                        this.setState({ books: response.data 
                        })
                    } 
                )
        }

      delBook = (title, author) => {
        const oldBook = {
          title,
          author,
          username:this.Auth.getProfile().sub

        }
        let str = '{"title":"' + title + '","author":"' + author + '","username":"' + this.Auth.getProfile().sub + '"}';
      
        this.setState({books: this.state.books.filter(book => book != str)});

        AppDataService.delBook(oldBook);
      };
    //doesnt update deletion or addition immediately onto page!

      addBook = (title, author) => {
        const newBook = {
          title,
          author,
          username: this.Auth.getProfile().sub
        }

        this.setState ( { books: [... this.state.books, JSON.stringify(newBook) ] });
        }

      async helloWorld(){
        let tots = await AppDataService.totals();
        let stats = JSON.parse(tots.response);
        document.getElementById('totals').innerHTML = JSON.stringify(stats,null,'\t');
      }

      handleLogout(){
        console.log("here")
        this.Auth.logout()
            .then(res =>{
              this.props.history.push('/');
            })
            .catch(err =>{
                alert(err);
            })
      }
    
      handleChange(e){
          this.setState(
              {
                  [e.target.name]: e.target.value
              }
          )
      }

      getprofile = () => {
        console.log(this.Auth.getProfile().sub);
      }
//This function decodes the URI and gets the parameters passed to it.
  getQueryVariable(variable){
          var query = window.location.search.substring(1);
          var vars = query.split("&");
          for (var i=0;i<vars.length;i++) {
                  var pair = vars[i].split("=");
                  if(pair[0] === variable){return pair[1];}
          }
          return(false);
    }

  render(){
    return(
      <div className="ui container">
        <h1>Your Books</h1>

      <p>Welcome Home {this.Auth.getProfile().sub}</p>
      
      <React.Fragment>
          <AddBook addBook={this.addBook} />
      </React.Fragment>
      
      <React.Fragment>
          <ListBooksComponent
          books={this.state.books}
          delBook={this.delBook}
          />
      </React.Fragment>

      <h1 id="totals"></h1>

      <Button style={{ size: 200, marginLeft: 10 }} onClick={() => this.handleLogout()}>
                Log Out
      </Button>
      <Button style={{ size: 200, marginLeft: 10 }} onClick={() => this.helloWorld()}>
                Hello World!
      </Button>


      </div>

    );

  }

}




export default LandingPage;