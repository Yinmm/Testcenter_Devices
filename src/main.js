import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'


//配置请求的根路径,目前为测试路径
axios.defaults.baseURL = 'http://10.0.10.246:8091' //'https://www.liulongbin.top:8888/api/private/v1/'
// 请求拦截器，使拥有获取数据的权限,token验证
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config
})
// 基于session
// if(window.sessionStorage.data){
//     next()
// }else{
//     alert('session为空，请先登录')
//     next('/login')
// }
// 每次请求带上cookie
//  axios.defaults.withCredentials = true
Vue.prototype.$http = axios


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
