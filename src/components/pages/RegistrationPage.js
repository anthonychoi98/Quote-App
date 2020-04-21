// import React from 'react';
// import {Link} from "react-router-dom";
// import RegistrationForm from "../forms/RegistrationForm";
// import axios from 'axios';
// import {Button } from 'semantic-ui-react';

// class RegistrationPage extends React.Component{



// //Gets the data and sumbits it for a post request
// submit = data => {

//   axios.post('http://localhost:8080/signup',data)
//   .then(function(response){
//     //This is responsible for the page navigation. submit is a proptype which requires a func, so it needs to return something
//     return(
//         response.data.success
//         ?  (document.getElementById('status').innerHTML = "Registration Successfull! You are being redirected to login in 5 seconds.",setTimeout(() => {window.location.replace('/login')},5000))
//         : document.getElementById('status').innerHTML = response.data.message
//     );
//   });
// };



// render(){

//   //alert("Response is : " + this.state.response);
//   return(
//     <div align="top">
//       <h1>Registration Page</h1>
//       <RegistrationForm  submit={this.submit}/>
//         <p id="status"></p>
//         <Link to="/" className="button">Back to Home</Link>

//     </div>

//   );

// }

import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import RegistrationForm from "../forms/RegistrationForm";


const submit = data => {

    axios.post('http://localhost:8080/signup',data)
    .then(function(response){
      //This is responsible for the page navigation. submit is a proptype which requires a func, so it needs to return something
      return(
          response.data.success
          ?  (document.getElementById('status').innerHTML = "Registration Successfull! You are being redirected to login in 5 seconds.",setTimeout(() => {window.location.replace('/login')},5000))
          : document.getElementById('status').innerHTML = response.data.message
      );
    });
  };


const RegistrationPage = (props) => (

    <div className="ui container">
      <img src={"./cameraman.png"}/>

      <h1>Registration Page</h1>
      <RegistrationForm  submit={submit}/>
        <p id="status"></p>
        <Button style={{ size: 200 }} onClick={() => props.history.push("/")}>
        Go Back Home
      </Button>
      
    </div>
    
    );

export default RegistrationPage;