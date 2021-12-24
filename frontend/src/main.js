import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
// import '@themesberg/flowbite';
{
  /* <script src='https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js'></script>; */
}

const app = createApp(App);
//functional Dependencies
app.use(store);
app.use(router);
app.mount('#app');
