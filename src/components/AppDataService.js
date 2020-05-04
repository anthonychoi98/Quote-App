
import axios from 'axios'
import Auth from './auth.js';

class AppDataService {

    constructor(){
        this.Auth = new Auth();
    }
//maybe should be a post
    async retrieveAllQuotes(state) {
        console.log('getting all quotes');
        let username = this.Auth.getProfile().sub;
        let book = state.state;

        return await axios.post("http://localhost:8080/getQuotes", {title: book.title, author: book.author, username}, {
            headers: {'Content-Type': 'application/json',   
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async retrieveAllBooks(){
        let username = this.Auth.getProfile().sub;
    
        return await axios.post("http://localhost:8080/getBooks", username, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus) ;
    }

    async insertQuote(quote){
        console.log('quote is : ',quote);
        return await axios.post("http://localhost:8080/addQuote", quote, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async insertBook(book){
        return await axios.post("http://localhost:8080/addBook", book, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async delQuote(quote){
        console.log("deleting", quote);
        return await axios.delete("http://localhost:8080/deleteQuote", {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
            data: quote
        })
            .then(this._checkStatus);
    }

    async delBook(book){
        console.log(book);
        return await axios.delete("http://localhost:8080/deleteBook", {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
            data: book
            })
            .then(this._checkStatus);
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
        console.log('Bearer ', localStorage.getItem('id_token'));
        let data = await axios.get("http://localhost:8080/totals", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
        })
            .then(this._checkStatus);
        return data.request;
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