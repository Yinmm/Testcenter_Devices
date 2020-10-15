import Vue from 'vue'
import {Message,MessageBox} from 'element-ui'
import Element from 'element-ui'
import Vuecookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Element)
Vue.use(Vuecookies)
// Vue.use(MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

