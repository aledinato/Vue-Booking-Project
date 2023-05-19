import { createApp } from 'vue'
import {createStore, useStore} from 'vuex'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "bootstrap/dist/js/bootstrap.js";

import './assets/main.css'
import App from './App.vue'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import router from './routes/routes'

const store = createStore({
    modules: {
        auth,
    },
    plugins: [createPersistedState()],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth && !store.getters.isLoggedIn)) {
        return router.push('/login');
    }
    next();
})

const app=createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
