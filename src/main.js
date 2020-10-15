import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
import Vuecookies from 'vue-cookies'
import { Message, MessageBox } from 'element-ui'
import apiconfig from '../api.config'


//配置请求的根路径
// axios.defaults.baseURL = 'http://10.0.12.165:8091' 
//axios.defaults.baseURL = 'http://10.0.10.246:8091' 
axios.defaults.baseURL = apiconfig.baseUrl;
// 请求拦截器，使拥有获取数据的权限,token验证
axios.interceptors.request.use(config => {
    //console.log(config);
    config.headers.Authorization = Vuecookies.get('token');
    return config
})


// 拦截器 验证token是否过期
axios.interceptors.response.use(
    response=>{
        //console.log(response.data)
        if(response.data.meta.status===500){
            window.sessionStorage.clear();
            MessageBox.alert('登录信息超时，尝试重新登录中...')
            // 重定向到登录页
            setTimeout(
                "parent.location.href='/Login'",2000
            )
            
        }
        return response
    }
)




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
