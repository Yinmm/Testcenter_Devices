import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Devices from "../components/Devices/Devices.vue"
import Devices_ios from "../components/Devices/Devices_ios.vue"
import Devices_Android from "../components/Devices/Devices_Android.vue"
import user from "../components/user/user.vue"

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect:'/devices',
    children:[
        {path:'/devices',component:Devices},
        { path: '/user', component: user },
        { path: '/devices_ios', component: Devices_ios },
        { path: '/devices_android', component: Devices_Android }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路劲
    //from 代表从哪个路径跳转出来
    //next 是一个行数，表示放行
    //  next（）放行   next('/login') 强制跳转
    if (to.path == '/login') return next();
    //获取token值
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router
