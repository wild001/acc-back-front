import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//pinia
import { createPinia } from 'pinia'



app.use(router).use(createPinia()).mount('#app')
