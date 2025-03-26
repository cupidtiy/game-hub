import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key: 'b1dc47698b6947349fc3ac14a3303583'
    }
})