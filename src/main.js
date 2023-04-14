import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from "primevue/config";
import router from "@/router/router";
import "./index.css";
import "primevue/resources/themes/saga-blue/theme.css";       //theme
import "primevue/resources/primevue.min.css";                 //core css
import  "primeicons/primeicons.css";  //icons
import axios from 'axios'; // Import Axios

// Set global base URL for Axios
axios.defaults.baseURL = 'https://pivnykotol.herokuapp.com/'; // Replace with your actual base URL
//axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.config.globalProperties.$http = axios;

app.mount('#app');