import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import 'bootstrap/dist/css/bootstrap.css';

createApp(App)
  .use(router)
  .mount('#app');