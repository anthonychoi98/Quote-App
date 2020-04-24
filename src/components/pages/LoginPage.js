import React from 'react';
import {Link} from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './cameraman.png';
import Auth from '../auth.js';


class LoginPage extends React.Component{

// //This gets the data and sends it as a post request
// submit = (data) => {

//     //alert("username: " + data.username);
//     //This calls the URL to submit the post request.
//     //console.log(data);
//     axios.post('http://localhost:8080/login', data).then(function(response){
//       var email = response.data.email;

//       console.log(data.email);
//       //store auth token into localstorage
//       //This part is responsible for the window navigation after login. BEFORE IT DIDN'T RETURN ANYTHING, JUST EXECUTED
//       return(
//         response.data ? (document.getElementById('status').innerHTML = "Login Successful! You are being redirected to landing page in 3 seconds.",setTimeout(() => {window.location.replace('/landing?name='+ data.email)},3000)) : document.getElementById('status').innerHTML = response.data.message
//       );
//     });
//   };

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new Auth();
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/landing');
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

/*
import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import LoginForm from "../forms/LoginForm";
import axios from 'axios';

const submit = async(data) => {

    //alert("username: " + data.username);
    //This calls the URL to submit the post request.
    //console.log(data);
    await axios.post('http://localhost:8080/authenticate', data).then(function(response){
      var username = response.data.username;
      
      console.log(response);
      //store auth token into localstorage
      //This part is responsible for the window navigation after login. BEFORE IT DIDN'T RETURN ANYTHING, JUST EXECUTED
      return(
        response.data ? (document.getElementById('status').innerHTML = "Login Successful! You are being redirected to landing page in 3 seconds.",setTimeout(() => {window.location.replace('/landing?name='+ data.username)},3000)) : document.getElementById('status').innerHTML = response.data.message
      );
    });
  };


const LoginPage = (props) => (

    <div className="ui container">
      <img src={"./cameraman.png"}/>
      <h1>Login Page</h1>

      <LoginForm submit={submit}/>
      <p id="status"></p>
      <p>Make a new account? Right here.</p>
    
      <Button style={{ size: 200 }} onClick={() => props.history.push("/registration")}>
        Register for Account
      </Button>
      
    </div>
    
    
    );

    

export default LoginPage;
*/