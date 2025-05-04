import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "element-plus/theme-chalk/el-message.css";

router.beforeEach((to, from) =>{
  const token = localStorage.getItem('pz_token')
  // 没有权限且不在登录页面
  if (!token && to.path !== '/login') {
    return '/login'
  }else if(token && to.path === '/login') {
    return '/'
  }else{
    return true
  }


})




const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//pinia
import { createPinia } from 'pinia'



app.use(router).use(createPinia()).mount('#app')
