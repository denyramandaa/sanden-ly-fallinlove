import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import "./index.css";

import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faHeart);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.unwrapInjectedRef = true;

app.use(createPinia())
app.use(router)

app.mount('#app')
