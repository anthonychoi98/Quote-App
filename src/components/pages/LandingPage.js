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
import PopupComponent from '../PopupComponent';


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
        quotes: [],
        totals: []
      };
    
      componentDidMount() {
            this.refreshQuotes();
        }
    
        refreshQuotes() {
            AppDataService.retrieveAllQuotes()
                .then(
                    response => {
                        console.log(response);
                        this.setState({ quotes: response.data 
                        })
                    } 
                )
        }
    
      markComplete = id => {
        this.setState({
          quotes: this.state.quotes.map(quote => {
            if (quote.id === id) {
              quote.completed = !quote.completed;
            }
            return quote;
          })
        });
      };
    
      // Delete Quote
      delQuote = id => {
          this.setState( {quotes: [... this.state.quotes.filter(quote => quote.id != id) ]})
      };
    
      // Add Todo
      addQuote = (title, author, quote, chapter, comment) => {
        
        const newQuote = {
          id: uuid.v4(),
          title,
          author, 
          quote,
          chapter,
          comment
        }
    
        this.setState( {quotes: [... this.state.quotes, JSON.stringify(newQuote) ] });
        //doesnt refresh quotes everytime....
        this.componentDidMount();
        
      }

      async helloWorld(){
        let tots = await AppDataService.totals();
        let stats = JSON.parse(tots.response);
        console.log('tots', JSON.parse(tots.response));
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
        <h1>Landing Page</h1>

      <p>Welcome Home {this.getQueryVariable("name")}</p>

      <React.Fragment>
          <AddQuote addQuote={this.addQuote} />
          <ListQuotesComponent
          quotes={this.state.quotes}
          markComplete={this.markComplete}
          delQuote={this.delQuote}
          />
      </React.Fragment>

      <React.Fragment>
          <AddBook addBook={this.addBook} />
          <ListQuotesComponent
          quotes={this.state.quotes}
          markComplete={this.markComplete}
          delQuote={this.delQuote}
          />
      </React.Fragment>
      
      <React.Fragment>
          <ListQuotesComponent
          quotes={this.state.quotes}
          markComplete={this.markComplete}
          delQuote={this.delQuote}
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