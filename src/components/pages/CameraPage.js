import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button } from 'semantic-ui-react';
import './cameraman.png';
import Auth from '../auth.js';
import LoginForm from '../forms/LoginForm';
import CameraComponent from '../CameraComponent';
import Crop from '../Crop';

class CameraPage extends React.Component{

    constructor(){
      super();
      
    }


    render(){
        return(
            <div>
                <h2>Copy and paste the extracted text into the quote input field</h2>
            <CameraComponent/>
            </div>
        )
    }
}

export default CameraPage;