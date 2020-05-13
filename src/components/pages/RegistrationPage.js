
import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import RegistrationForm from "../forms/RegistrationForm";

class RegistrationPage extends React.Component{
  
    constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
  
    componentWillMount(){
    }
    
  
    //This renders the HTML code
    render(){
      return(
        <div>
        <h1>Registration Page</h1>
        <div className="row" style={rowstyle}>
        
          <div className="column" style={columnstyle}>   
          <RegistrationForm  submit={this.handleFormSubmit}/>
          
            <p id="status"></p>
            <Button onClick={() => this.props.history.push("/")}>
            Go Back Home
          </Button>
          </div>
          <div className="column" style={columnstyle}>
            <img src="https://thumbs.gfycat.com/MistyAcidicAsiaticlesserfreshwaterclam-max-1mb.gif"></img>
          </div>
          
        </div>
        </div>
        );
      }
  
      handleFormSubmit(data){
        axios.post('https://elegant-aryabhata-740be9.netlify.app/signup',data).then(res =>{
          this.props.history.replace('/login');
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
  }
  var rowstyle = {
    display: 'flex'
  };
  var columnstyle = {
    flex: '50%',
    paddingTop: '12px'
  }
  
  
  
  
  export default RegistrationPage;