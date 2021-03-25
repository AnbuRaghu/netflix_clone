import axios from 'axios';

// base url to make request to the movie databases..axios gives a good create method and we need to parse baseUrl to it..it's very gopod pattern if we do lot of request from our app
const instance=axios.create({
    baseURL:'https://api.themoviedb.org/3',
})

//instance.get('/foo-bar) if you use like this the request gonna be
//https://api.themoviedb.org/3/foo-bar
export default instance