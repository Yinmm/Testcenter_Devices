import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import userhome from '../components/userhome.vue'
import Devices from "../components/Devices/Devices.vue"
import Devices_ios from "../components/Devices/Devices_ios.vue"
import Devices_Android from "../components/Devices/Devices_Android.vue"
import user from "../components/user/user.vue"
import Admin from "../components/admin.vue"
import adminDevices from "../components/Devices/adminDevices.vue"
import adminDevices_ios from "../components/Devices/adminDevices_ios.vue"
import adminDevices_Android from "../components/Devices/adminDevices_Android.vue"
import addnew from "../components/admin/addnew.vue"
import checked from "../components/admin/checked.vue"
import Vuecookies from 'vue-cookies'
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
        component: userhome,
        redirect: '/devices',
        children: [
            { path: '/devices', component: Devices },
            { path: '/user', component: user },
            { path: '/devices_ios', component: Devices_ios },
            { path: '/devices_android', component: Devices_Android }
        ]
    },
    {
        path: '/admin',
        name:'admin',
        component: Admin,
        redirect: '/admindevices',
        children: [
            { path: '/admindevices', component: adminDevices },
            { path: '/admindevices_ios', component: adminDevices_ios },
            { path: '/admindevices_android', component: adminDevices_Android },
            { path: '/checked', component: checked },
            { path: '/addnew', component: addnew }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
//     //to 将要访问的路劲
//     //from 代表从哪个路径跳转出来
//     //next 是一个行数，表示放行
//     //  next（）放行   next('/login') 强制跳转
    if (to.path == '/login') return next();
//     //获取token值
    const tokenStr = Vuecookies.get('token');
    if (!tokenStr) return next('/login')
    next()
})

export default router
