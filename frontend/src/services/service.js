import API from './API';
export default {
  getForms() {
    return API().get('getForms');
  },
  getFilledSurveys() {
    return API().get('getFilledSurveys');
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
        return response.data;
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
  signUp(user) {
    return API()
      .post('userRegister', {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response) {
          if (response) {
            return true;
          }
        }
      });
  },
  saveFeedback(data) {
    return API()
      .post('StoreFeedback', {
        id: data.id,
        filled: data.filled,
        answers: data.checked,
        email: data.email,
      })
      .then((response) => {
        if (response.status === '200') {
          return true;
        }
        return false;
      });
  },
};
