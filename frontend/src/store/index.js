import { createStore } from 'vuex';

export default createStore({
  state: {
    data: null,
    loaded: false,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
      //console.log(state.data);
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
