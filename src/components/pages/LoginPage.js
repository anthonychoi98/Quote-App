import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './cameraman.png';
import Auth from '../auth.js';
import LoginForm from '../forms/LoginForm';

class LoginPage extends React.Component{

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new Auth();
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/landing?name='+ this.Auth.getProfile());
  }

  //This renders the HTML code
  render(){
    return(
        <div>
            <h1>Login Page</h1>
            <LoginForm submit={this.handleFormSubmit}/>
            <p id="status"></p>
            <p>Make a new account? Right here.</p>
            <Button style={{ size: 200, marginLeft: 10 }} onClick={() => this.props.history.push("/registration")}>
              Register for Account
              </Button>
              
        </div>

      );
    }

    handleFormSubmit(data){
      this.Auth.login(data)
          .then(res =>{
            this.props.history.replace('/landing?name='+ data.username);
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




export default LoginPage;
