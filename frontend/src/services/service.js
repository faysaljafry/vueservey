import API from './API';
export default {
  getForms() {
    return API().get('getForms');
  },
  updateSurvey(data) {
    return API()
      .post('updateSurvey', data)
      .then(() => {
        // console.log('data was updated successfully!');
      });
  },
  login(user) {
    return API()
      .post('login', {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  },
};
