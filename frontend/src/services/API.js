import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: `https://vuesurvey.herokuapp.com/`,
    // baseURL: `https://vueweather-pwa.herokuapp.com/`, // the url of our server
  });
};
