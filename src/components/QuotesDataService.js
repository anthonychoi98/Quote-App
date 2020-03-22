
import axios from 'axios'

class QuotesDataService {
    retrieveAllQuotes() {
        return axios.get("/totals");
    }
}
export default new QuotesDataService()