
import axios from 'axios'

class AppDataService {
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
}
export default new AppDataService()