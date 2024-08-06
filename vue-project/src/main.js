import './assets/main.css'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favs from './pages/Favs.vue'
import {createRouter, createWebHistory} from 'vue-router'
import './assets/output.css'; // Import the global CSS file

const app = createApp(App)
app.use(autoAnimatePlugin)



const routes = [
    { path: '/', name:"Home", component: Home},
    { path: '/favs', name:"Favs", component: Favs}
]

const router = createRouter({
    history: createWebHistory('/sneakers/'),
    routes,
  })

app.use(router)



// APP.MOUNT(APP) NEEDS TO BE IN THE END 

app.mount('#app')