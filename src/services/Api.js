import axios from 'axios'

export default () => {
    return axios.create({
        baseURL : 'http://localhost:3030'|| 'devhunt-back-304.vercel.app'
    })
}