import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: `http://localhost:3000`,
    // baseURL: `https://vueweather-pwa.herokuapp.com/`, // the url of our server
  });
};
