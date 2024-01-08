import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app')