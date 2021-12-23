import { createStore } from 'vuex';

export default createStore({
  state: {
    data: [],
    loaded: false,
    formToEdit: {},
  },
  mutations: {
    setData(state, data) {
      state.data = data;
      state.loaded = true;
      //console.log(state.data);
    },
    setFormToEdit(state, index) {
      state.formToEdit = state.data[index];
    },
    saveNewSurvey(state, data) {
      state.data.push(data);
    },
    updateSurvey(state, data) {
      state.data.forEach((survey) => {
        if (survey._id === data._id) {
          survey = data;
        }
      });
    },
  },
  getters: {
    getData(state) {
      return state.data;
    },
    getForTOEdit(state) {
      return state.formToEdit;
    },
    loadedFlag(state) {
      return state.loaded;
    },
  },
  actions: {},
  modules: {},
});
