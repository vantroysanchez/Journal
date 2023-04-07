import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-e1eca-default-rtdb.firebaseio.com'
})

export default journalApi