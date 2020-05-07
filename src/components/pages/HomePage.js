import React from 'react';
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import { Link } from 'react-router-dom';

const HomePage = (props) => (
<div className="ui container">
  <img src={"./cameraman.png"}/>

  <h1>Home Page</h1>

  <Button style={{ size: 200, marginRight: 10 }} onClick={() => props.history.push("/login")}>
    Log in
  </Button>

  <Button style={{ size: 200, marginLeft: 10 }} onClick={() => props.history.push("/registration")}>
    Register for Account
  </Button>
  
</div>

);

export default HomePage;