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
  alogin(admin) {
    return API()
      .post('adminLogin', {
        email: admin.email,
        password: admin.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('admin', JSON.stringify(response.data));
        }
      });
  },
  userLogin(user) {
    return API()
      .post('userLogin', {
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
