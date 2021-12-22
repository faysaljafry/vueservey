import API from './API';
export default {
  getForms() {
    return API().get('getForms');
  },
  login(user) {
    return API()
      .post(signin, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  },
};
