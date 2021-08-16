import axios from 'axios';

export default class AxiosService{
    
    getMethod = async (url,isHeaderRequired = false) => {
        console.log("Axios Service",url);
        return await axios.get(url,isHeaderRequired)
    }

    // getMethod = (url)

} 