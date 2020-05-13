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
          <div className="row" style={rowstyle}>
            <h1>Login Page</h1>
          </div>

          <div className="column" style={columnstyle}>
            <LoginForm submit={this.handleFormSubmit}/>
            <p id="status"></p>
            <p>Make a new account? Right here.</p>
            <Button style={{ size: 200, marginLeft: 10 }} onClick={() => this.props.history.push("/registration")}>
              Register for Account
              </Button>
          </div>

          <div className="column" style={columnstyle}>
            <img src="data:image/jpeg;base64,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"/>
          </div>

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

var rowstyle = {
  display: 'flex'
};
var columnstyle = {
  flex: '50%',
  paddingTop: '12px'
}

export default LoginPage;
