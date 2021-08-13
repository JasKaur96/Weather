import axios from 'axios';

export default class AxiosService{
    
    getMethod = (url,isHeaderRequired = false) => {
        console.log("Axios Service",url);
        return axios.get(url,isHeaderRequired)
    }

    // getMethod = (url)

} 