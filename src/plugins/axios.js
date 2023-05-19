import axios from "axios";
const setParams = (token) => {
    axios.defaults.baseURL = 'http://192.168.77.230:5001/';
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}


export default setParams;