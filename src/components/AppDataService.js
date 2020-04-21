
import axios from 'axios'
import Auth from './auth.js';

class AppDataService {

    constructor(){
        this.Auth = new Auth();
    }

    retrieveAllQuotes() {
        return axios.get("http://localhost:8080/getQuotes");
    }
    retrieveAllBooks(){
        return axios.get("http://localhost:8080/getBooks");
    }
    insertQuote(quote){
        return axios.post("http://localhost:8080/addQuote", quote);
    }
    insertBook(book){
        return axios.post("http://localhost:8080/addBooks", book);
    }
    login(email, password){
        return axios.get("http://localhost:8080/login", email, password);
    }
    register(email, password){
        return axios.post("http://localhost:8080/signup", email, password);
    }
    hello(){
        return axios.get("http://localhost:8080/hello", {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus) 
            
    }
    //get coronavirus stats
    async totals(){
        console.log("getting totals");
        let data = await axios.get("http://localhost:8080/totals", {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);

        console.log(data.request.response);
        return data.request.response;
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
export default new AppDataService()