import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params:{
        key:'AIzaSyAgjC9jQUn_a8IpjyU-F2ZShrY2To01jt0'
    }
})

export default authApi