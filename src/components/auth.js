import axios from 'axios';
import decode from 'jwt-decode';


export default class Auth {

    constructor() {
      this.domain = 'http://localhost:8080'
      this.login = this.login.bind(this)
      this.getProfile = this.getProfile.bind(this)
    }
  
    login(data) {
      this.authenticated = true;
      
      return this.post('http://localhost:8080/authenticate', data).then(res => {
        console.log(res.data)
        this.setToken(res.data.jwt)
        return Promise.resolve(res);
    }) 
    }
  
    logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
      return Promise.resolve();
    }
  
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    setToken(idToken) {
      console.log(idToken);
      // Saves user token to localStorage
      
      localStorage.setItem('id_token', idToken);
      console.log("saved token");

    }

    getToken() {
      console.log("over here");
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token')
    }

    isTokenExpired(token) {
      try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
              return true;
          }
          else
              return false;
      }
      catch (err) {
          return false;
      }
    }

    getProfile() {
      return decode(this.getToken());
    }

    post(url, options) {
      // performs api calls sending the required authentication headers
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }

      if (this.loggedIn()) {
        axios.defaults.headers.common['Authorization'] = 
        'Bearer ' + localStorage.getItem('id_token');
      }
      //axios.post('http://yourendpoint',data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
      //.then(response=> console.log(response))
      //.catch(error => console.log(error));
      //};
      return axios.post(url, {
          headers,
          ...options
      })
          .then(this._checkStatus) 
      }

      _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
  }
  
  //export default new Auth();
  