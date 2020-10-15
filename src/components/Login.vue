<template>
    <div v-if="false" class="login_container">
        <div class="png" v-if="true">
             <img src="../assets/image/BorrowRoute1.png" />
        </div>
        <div style="width:21%;height:25%">
            <div class="login_box">
                <!-- logo区 -->
                <div class="logo_box">
                    <p>测试中心设备借用管理平台</p>
                </div>
                <!-- 登录表单区 -->
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                    <!-- 账户 -->
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="iconfont icon-user"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native="login" prefix-icon="iconfont icon-3702mima"></el-input>
                    </el-form-item>
                    <!-- 按钮区域 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="register">注册</el-button>
                        <el-button type="primary" @click="login" :disabled="isDisabled">登录</el-button>
                    </el-form-item>
                </el-form >
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      isDisabled:false,
      // 登录表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入JIRA登录账号', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入JIRA登录密码', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      dynamicSegment:"",
      DevicesFileter:'',
    }
  },
  watch:{
      $router(to,from){
          console.log(to)
          console.log(from)
          this.dynamicSegment = to.params.id 
      }
  },
  created(){
      this.getURL();
  },
  methods:{
     async getURL(){
        const url = window.location.href.toString();
        //var jiraurl = 'http://10.0.111.80:8080/secure/unifiedlogin!default.jspa'
        var u = url.split("?")
        //console.log(!u[1])
        if(!u[1]){
        //   window.location = 'http://10.0.111.80:8080/secure/unifiedlogin!default.jspa?redirectUrl=http://10.0.12.155:8095'//没有session就继续跳转到jira获取
         window.location = 'http://10.0.111.80:8080/secure/unifiedlogin!default.jspa?redirectUrl=http://10.0.10.246:8090'//没有session就继续跳转到jira获取
        }else{
            var j = u[1].split('=')
            var Reurl ={
                JSESSIONID:j[1]
            }
            const {data:res} = await this.$http.get("/login",{params:Reurl}) //
            //console.log(res.meta.status)
            // if(res.meta.status !=200) return window.location = 'http://10.0.111.80:8080/secure/unifiedlogin!default.jspa?redirectUrl=http://10.0.12.155:8095'//继续跳转到jira
            if(res.meta.status !=200) return window.location = 'http://10.0.111.80:8080/secure/unifiedlogin!default.jspa?redirectUrl=http://10.0.10.246:8090'//继续跳转到jira
            //1.将登录成功后的token，保存到客户端的sessionStorage cookie中
            this.$cookies.set("token",res.data.dict.token,"7d")
            window.localStorage.setItem("token",res.data.dict.token);
            //2.将登陆后的个人信息保存到客户端sessionStora中
            window.localStorage.setItem("email",res.data.dict.email)
            this.$cookies.set("email",res.data.dict.email,"7d")
            window.localStorage.setItem("dep",res.data.dict.department)
            window.localStorage.setItem("job_number",res.data.dict.job_number)
            window.localStorage.setItem("group",res.data.dict.group)
            window.localStorage.setItem("phone",res.data.dict.phone)
            window.localStorage.setItem("local",res.data.dict.local)
            if(res.data.dict.is_manage){
                this.$router.push('/admin') 
            }else{
            this.$router.push('./home')
            }

        } 
     },
    // 延时方法
    timeDelay(){
			const Time_count = 2
			if(!this.timer){
				this.count =Time_count;
				this.isDisabled =true
				this.timer = setInterval(()=>{
					if(this.count>0 && this.count <=Time_count){
						this.count--;
					}else{
						this.isDisabled = false
						clearInterval(this.timer)
						this.timer =null;
					}
				},1000)
			}
		},
    login(){
        this.timeDelay();
        this.$refs.loginFormRef.validate(async valid =>{ //async异步
            //登录前预验证
            if(!valid) return;
            //登录接口验证
            const {data:res} = await this.$http.post("login",this.loginForm) //
            .catch((error) => {
                console.log('错误信息:'+error)
                return this.$message.error("服务器连接失败,请联系管理员")//
                }
            );
            //测试账号admin 123456
            if(res.meta.status !=200) return this.$message.error("账号或密码错误")
            this.$message.success("登录成功")
            //1.将登录成功后的token，保存到客户端的sessionStorage和cookies中
            window.sessionStorage.setItem("token",res.data.dict.token);
            this.$cookies.set("token",res.data.dict.token,"7d")
            //1.将登陆后的个人信息保存到客户端sessionStora中
            window.sessionStorage.setItem("email",res.data.dict.email)
            this.$cookies.set("email",res.data.dict.email,"7d")
            window.sessionStorage.setItem("dep",res.data.dict.department)
            window.sessionStorage.setItem("job_number",res.data.dict.job_number)
            window.sessionStorage.setItem("group",res.data.dict.group)
            window.sessionStorage.setItem("phone",res.data.dict.phone)
            window.sessionStorage.setItem("local",res.data.dict.local)


            //1-1 将登录成功后的session，保存到Cookies中
                // 将session接收数据解析成JSON字符串
            // var d = JSON.stringify(res.data[0])
            // window.Cookies.setitem()
            // //2.通过编程式导航跳转到登录后主页,普通用户或管理员页面
            // this.$router.push('/admin') 
            if(res.data.dict.is_manage){
                this.$router.push('/admin') 
            }else{
            this.$router.push('./home')
            }
            // this.$router.push('./home')
            // 请求筛选列表
            
            


        })
    },
    register(){
        var url = "http://10.0.111.80:8080/login.jsp"
        window.open(url ,'_blank')
    }              
  }
}
</script>

<style lang='less' scoped>
    .login_container {
        // background-image:'../assets/image/background.png';
        background:url('../assets/image/back.png');
        // background-image: linear-gradient(to right,#3fe00e,#81f79f) ;
        background-size: 100% 100%;
        height: 100%;
        width: 100%;
    }
    .png{
        width: 50%;
        height: 70%;
        transform: translate(0%, 20%);
        display: inline-block;
        *display: inline;
        *zoom: 1;
        img{
            max-width: 100%;
            height: auto;
        }
    }
    .login_box {
        width: 400px;
        height: 250px;
        background-color:snow ;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(65%, -30%);
    }
    .logo_box{
        border-radius: 50%;
        margin-left: 18px ;
        margin-top: 0px;
        float: left;
        p {
            padding-top: 0px;
            margin-top: 15px;
            width: auto;
            height: 50%;
            color: rgb(71, 231, 71);
            font-size:20px ;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

</style>
