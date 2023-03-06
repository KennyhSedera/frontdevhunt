import axios from 'axios'

export default () => {
    return axios.create({
        baseURL : 'http://localhost:3030' || 'https://devhunt-back-304.vercel.app/'
    })
}