
import axios from 'axios'
import Auth from './auth.js';
import qs from "qs";


class AppDataService {

    constructor(){
        this.domain = window.location.origin;
        this.Auth = new Auth();
    }

    async retrieveAllQuotes(state) {
        let username = this.Auth.getProfile().sub;
        let book = state.state;

        return await axios.post(this.domain.concat("/getQuotes"), {title: book.title, author: book.author, username}, {
            headers: {'Content-Type': 'application/json',   
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async retrieveAllBooks(){
        let username = this.Auth.getProfile().sub;
    
        return await axios.post(this.domain.concat("/getBooks"), username, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus) ;
    }

    async extractQuote(blob){
        let formdata = new FormData();

        //image is a now a file
        formdata.append('Image', blob);

        return await axios.post(this.domain.concat("/api/ocr"), formdata, {
            headers: {'Content-Type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus) ;

    }

    async insertQuote(quote){
        console.log('quote is : ',quote);
        return await axios.post(this.domain.concat("/addQuote"), quote, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async insertBook(book){
        return await axios.post(this.domain.concat("/addBook"), book, {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus);
    }

    async delQuote(quote){

        return await axios.delete(this.domain.concat("/deleteQuote"), {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
            data: quote
        })
            .then(this._checkStatus);
    }

    async delBook(book){
        console.log(book);
        return await axios.delete(this.domain.concat("/deleteBook"), {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')},
            data: book
            })
            .then(this._checkStatus);
    }

    register(email, password){
        return axios.post(this.domain.concat("/signup", email, password));
    }
    
    hello(){
        return axios.get(this.domain.concat("/hello"), {
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
        })
            .then(this._checkStatus) 
            
    }
    //get coronavirus stats
    async totals(){
        console.log('Bearer ', localStorage.getItem('id_token'));
        let data = await axios.get(this.domain.concat("/totals"), {
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