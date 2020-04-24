
import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import LoginForm from "../forms/LoginForm";
import axios from 'axios';
import RegistrationForm from "../forms/RegistrationForm";

// const submit = data => {

//     axios.post('http://localhost:8080/signup',data)
//     .then(function(response){
//       //This is responsible for the page navigation. submit is a proptype which requires a func, so it needs to return something
//       return(
//           response.data.success
//           ?  (document.getElementById('status').innerHTML = "Registration Successfull! You are being redirected to login in 5 seconds.",setTimeout(() => {window.location.replace('/login')},5000))
//           : document.getElementById('status').innerHTML = response.data.message
//       );
//     });
//   };


// const RegistrationPage = (props) => (

//     <div className="ui container">
//       <img src={"./cameraman.png"}/>

//       <h1>Registration Page</h1>
//       <RegistrationForm  submit={submit}/>
//         <p id="status"></p>
//         <Button style={{ size: 200 }} onClick={() => props.history.push("/")}>
//         Go Back Home
//       </Button>
      
//     </div>
    
//     );

// export default RegistrationPage;

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

        <div className="ui container">
          <img src={"./cameraman.png"}/>

          <h1>Registration Page</h1>
          <RegistrationForm  submit={this.handleFormSubmit}/>
            <p id="status"></p>
            <Button style={{ size: 200 }} onClick={() => this.props.history.push("/")}>
            Go Back Home
          </Button>
          
        </div>
  
        );
      }
  
      handleFormSubmit(data){
        axios.post('http://localhost:8080/signup',data).then(res =>{
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
  
  
  
  
  export default RegistrationPage;