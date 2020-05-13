import React from 'react';
import {Button} from 'semantic-ui-react';
import './cameraman.png';
import auth from '../auth.js'
import { Link } from 'react-router-dom';

const HomePage = (props) => (
<div className="ui container">
  <h1>Home Page</h1>
  
  <img src="https://66.media.tumblr.com/35e35ebc731bd19de75af73ae904ecd4/tumblr_n8gxp1JWwO1r6zgh0o1_500.gifv"></img>

  <Button style={{ display: 'inline-block', marginRight: 10 }} onClick={() => props.history.push("/login")}>
    Log in
  </Button>

  <Button style={{ display: 'inline-block',marginLeft: 10 }} onClick={() => props.history.push("/registration")}>
    Register for Account
  </Button>
  
</div>

);

export default HomePage;