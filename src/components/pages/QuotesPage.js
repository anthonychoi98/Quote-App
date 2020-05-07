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


class QuotesPage extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.Auth = new Auth();
        this.helloWorld = this.helloWorld.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
      }

    state = {
        book: {
          title:this.props.location.state.state.title,
          author:this.props.location.state.state.author
        },
        quotes: [],
        totals: []
      };
    
      componentDidMount() {
            this.refreshQuotes();
        }
    
        async refreshQuotes() {
            await AppDataService.retrieveAllQuotes(this.props.location.state)
                .then(
                    response => {
                        this.setState({ quotes: response.data 
                        },
                        () => {console.log(response)})
                    } 
                )
        }
      
      async handleDelete(str){
        return await this.setState({quotes: this.state.quotes.filter(q => q!= str)},
        () => {console.log('async',this.state.quotes)});
      }
      async handleInsert(newQuote){
        return await this.setState( {quotes: [... this.state.quotes, JSON.stringify(newQuote) ] },
          () => {console.log('async',this.state.quotes)});  
      }
    
      // Delete Quote
      delQuote = (title, author, chapter, quote, comment, username) => {

        const oldQuote = {
          title,
          author,
          chapter,
          quote,
          comment,
          username: this.Auth.getProfile().sub
        }
        
        let str = '{"title":"' + title + '","author":"' + author + '","quote":"' + quote + '","chapter":' + chapter + ',"comment":"' + comment +'","username":"' + this.Auth.getProfile().sub + '"}';

        AppDataService.delQuote(oldQuote);

        this.handleDelete(str);

        this.componentDidMount();
        
      };
    
      // Add Todo
      addQuote = (title, author, quote, chapter, comment) => {
        
        const newQuote = {
          title,
          author, 
          quote,
          chapter,
          comment,
          username: this.Auth.getProfile().sub
        }

        this.handleInsert(newQuote);
    
        //this.setState( {quotes: [... this.state.quotes, JSON.stringify(newQuote) ] });      

      }

      async helloWorld(){
        let tots = await AppDataService.totals();
        let stats = JSON.parse(tots.response);
        document.getElementById('totals').innerHTML = JSON.stringify(stats,null,'\t');
      }

      handleLogout(){
        this.Auth.logout()
            .then(res =>{
              this.props.history.push('/');
            })
            .catch(err =>{
                alert(err);
            })
      }
    
      async handleChange(e){
          await this.setState(
              {
                  [e.target.name]: e.target.value
              }
          )
      }

  render(){
    const linkStyle= {
      borderRadius: '10px',
      background: 'lightblue',
      padding: '10px',
      marginTop: '10px',
      float: 'right'
    }
    return(
      
      <div className="ui container">

      <Link style={linkStyle} to="/camera"> Camera </Link> 

        <h1>Quotes for {this.state.book.title}</h1>

      <p>Welcome Home {this.Auth.getProfile().sub}</p>

      <React.Fragment>
          <AddQuote addQuote={this.addQuote} />

          <ListQuotesComponent
          quotes={this.state.quotes}
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


export default QuotesPage;