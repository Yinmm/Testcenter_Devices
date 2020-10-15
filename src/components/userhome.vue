<template>
	<el-container class="home_container">
		<!-- 头部区 -->
		<el-header>
			<div>
				<img src="../assets/image/testcenter.png" alt />
				<el-button type="text" style="float:left;font-size:18px;margin-top:10px;margin-left:-10px" disabled>设备借用平台</el-button>
             	<el-button type="text" style="float:left;font-size:18px;margin-top:10px" @click="switchData">测试数据平台</el-button>
			</div>
			<el-row>
				<el-button type="success" style="margin-right:0px" @click="userinfo" >个人资料修改</el-button>
				<!-- <el-button type="info" @click="logout">退出</el-button> -->
			</el-row>
		</el-header>
		<!-- 页面主体区 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<!--折叠按钮 -->
				<div class="toggle-button" @click="toggleCollapse">| | 
					|</div>
				<!-- 侧边栏菜单区域 -->
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409EFF"
					unique-opened
					:collapse="isCollapse"
					:collapse-transition="false"
					router
				>
					<!-- 一级菜单 -->
					<el-submenu :index="devices+''">
						<!-- 一级菜单模板区 -->
						<template slot="title">
							<!-- 图标 -->
							<i class="el-icon-mobile"></i>
							<!-- 文本 -->
							<span>设备列表</span>
						</template>
						<!-- 二级菜单 -->
						<!-- 实际列表 -->
						<el-menu-item index="devices">所有设备</el-menu-item>
						<el-menu-item index="devices_ios">
							<template slot="title">
								<i class="el-icon-apple"></i>
								<span>ios</span>
							</template>
						</el-menu-item>
						<el-menu-item index="devices_android">
							<template slot="title">
								<i class="el-icon-mobile-phone"></i>
								<span>Android</span>
							</template>
						</el-menu-item>
					</el-submenu>
					<el-menu-item index="user">
						<i class="el-icon-menu"></i>
						<span slot="title">个人借用</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 内容主体区 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
        <!-- 用户信息页面弹出 -->
		<el-dialog title="个人信息" :visible.sync="showuserinfoDialog" >
			<!-- 内容主体区 -->
			<el-form  :rules="rules" ref="UserinfoRef" :model="UserInfo">
				<el-form-item label="热聊邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model="UserInfo.email" style="width:70%"></el-input>
					<el-button type="success" id="getcode" @click="getEmailCode" :disabled="disabled=!show"> 
						<span v-if="show">获取邮箱验证码</span>
						<span v-if="!show" class="count">{{count}} s</span>
					</el-button>
				</el-form-item>
				<el-form-item label="输入验证码" :label-width="formLabelWidth" prop="emailcode">
					<el-input v-model="UserInfo.emailcode" maxlength="6"  show-word-limit style="width:150px;"></el-input>
				</el-form-item>
				<el-form-item label="所属部门" :label-width="formLabelWidth" prop="group">
					<el-input v-model="UserInfo.group" ></el-input>
				</el-form-item>
				<el-form-item label="所属项目" :label-width="formLabelWidth" prop="program">
					<el-input v-model="UserInfo.program" ></el-input>
				</el-form-item>
				<el-form-item label="工号" :label-width="formLabelWidth" prop="workid">
					<el-input v-model="UserInfo.workid" ></el-input>
				</el-form-item>
				<el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
					<el-input v-model="UserInfo.phone" ></el-input>
				</el-form-item>
				<el-form-item label="座位" :label-width="formLabelWidth" prop="local">
					<el-input v-model="UserInfo.local" ></el-input>
				</el-form-item>
			</el-form>                      
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="showuserinfoDialog = false">取 消</el-button>
				<el-button type="primary" @click="setuserinfo">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 第一次强制信息弹出 -->
		<el-dialog title="个人信息" :visible.sync="showuserinfoDialogmerge" modal :show-close=false :close-on-click-modal=false :close-on-press-escape=false>
			<!-- 内容主体区 -->
			<el-form  :rules="rules" ref="UserinfoRef" :model="UserInfo">
				<el-form-item label="热聊邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model="UserInfo.email" style="width:70%" placeholder='请输入爱奇艺邮箱'></el-input>
					<el-button type="success" id="getcode" @click="getEmailCode" :disabled="disabled=!show"> 
						<span v-if="show">获取邮箱验证码</span>
						<span v-if="!show" class="count">{{count}} s</span>
					</el-button>
				</el-form-item>
				<el-form-item label="输入验证码" :label-width="formLabelWidth" prop="emailcode">
					<el-input v-model="UserInfo.emailcode" maxlength="6"  show-word-limit style="width:150px;"></el-input>
				</el-form-item>
				<el-form-item label="输入姓名" :label-width="formLabelWidth" prop="u_name">
					<el-input v-model="UserInfo.u_name" maxlength="6"  placeholder='请输入jira账号对应的用户姓名' ></el-input>
				</el-form-item>
				<el-form-item label="所属部门" :label-width="formLabelWidth" prop="group">
					<el-input v-model="UserInfo.group" placeholder='请输入所在部门' ></el-input>
				</el-form-item>
				<el-form-item label="所属项目" :label-width="formLabelWidth" prop="program">
					<el-input v-model="UserInfo.program" placeholder='请输入所在项目组'></el-input>
				</el-form-item>
				<el-form-item label="工号" :label-width="formLabelWidth" prop="workid">
					<el-input v-model="UserInfo.workid" placeholder='请输入工号'></el-input>
				</el-form-item>
				<el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
					<el-input v-model="UserInfo.phone" placeholder='请输入手机号' ></el-input>
				</el-form-item>
				<el-form-item label="座位" :label-width="formLabelWidth" prop="local">
					<el-input v-model="UserInfo.local" placeholder='请输入座位号'></el-input>
				</el-form-item>
			</el-form>                       
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="setuserinfo">确 定</el-button>
			</div>
		</el-dialog>		
	</el-container>
</template>

<script>
export default {
	data() {
		// 手机和邮箱校验规则
		var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
				if (!value) {
				return callback(new Error('电话号码不能为空'))
				}
				setTimeout(() => {
					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('电话号码格式不正确'))
						}
					}
				}, 100)
		}
		var checkEmail = (rule, value, callback) => {
				const mailReg = /^([a-zA-Z0-9_-])+@(qiyi)+(.[a-zA-Z0-9_-])+/
				if (!value) {
					return callback(new Error('邮箱不能为空'))
				}
				setTimeout(() => {
					if (mailReg.test(value)) {
						callback()
					} else {
					callback(new Error('请输入爱奇艺邮箱'))
					}
				}, 100)
		}
		return {
			//左侧菜单数据
			menulist: [],
			iconsObj: {
				"125": "iconfont icon-user",
				"103": "iconfont icon-tijikongjian",
				"101": "iconfont icon-shangpin",
				"102": "iconfont icon-danju",
				"145": "iconfont icon-baobiao"
			},
			//是否折叠
			isCollapse: false,
            devices: [],
            // 个人信息:邮箱,部门，项目组，座位号，工号，手机号
            UserInfo:{
				u_name:'',
				email:"",
				emailcode:"",
                group:"",
				program:'',
				local:"",
				workid:'',
				phone:'',

			},
            showuserinfoDialog: false, 
            formLabelWidth:"100px",
            userid:'',
			showuserinfoDialogmerge: false, 
			//验证码按钮
			show:true,
			count:"",
			timer:null,
			rules:{
				email:[
					{ required: true,validator:checkEmail, trigger: 'blur' },
				],
				emailcode:[
					{ required: true, message:"请输入邮箱验证码",trigger: 'blur' }
				],
				u_name:[
					{required:true,message:"请输入jira账号用户姓名",trigger:'blur'}
				],
				group:[
					{required:true,message:"请输入部门",trigger:'blur'}
				],
				program:[
					{required:true,message:"请输入项目组",trigger:'blur'}
				],
				local:[
					{required:true,message:"请输入座位号",trigger:'blur'}
				],
				workid:[
					{required:true,message:"请输入工号",trigger:'blur'}
				],
				phone:[
					{required:true,validator:checkPhone ,trigger:'blur'}
				]
			}
		}
	},
	created() {
        // 首次登陆绑定信息
        this.isfirst()
		this.getuserinfo()
	

	},
	methods: {
		switchData(){
        var url = "http://10.0.10.246:8093/client_report"
        window.open(url)
    	},
		logout() {
			// 清除token值
			window.sessionStorage.clear();
			// 重定向到登录页
			this.$router.push("/login");
		},
		//获取所用菜单,动态渲染菜单列表
		// async getMenulist() {
		// 	const { data: res } = await this.$http.get("menus");
		// 	if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
		// 	this.menulist = res.data;
		// 	console.log(res);
		// },
		//点击按钮切换折叠菜单
		toggleCollapse() {
			this.isCollapse = !this.isCollapse;
        },
        //绑定信息按钮
        userinfo(){
			this.UserInfo.emailcode = ""
			this.showuserinfoDialog = true
        },
        getuserinfo(){
			// this.UserInfo.email = window.sessionStorage.getItem("email")
			this.UserInfo.email = this.$cookies.get("email")
            this.UserInfo.group = window.localStorage.getItem("group")
			this.UserInfo.local = window.localStorage.getItem("local")
			this.UserInfo.program = window.localStorage.getItem("dep")
			this.UserInfo.workid = window.localStorage.getItem("job_number")
			this.UserInfo.phone = window.localStorage.getItem("phone")
			if(this.UserInfo.email =="null"){
				this.UserInfo.email = ''
				this.UserInfo.group =''
				this.UserInfo.local =''
				this.UserInfo.program = ''
				this.UserInfo.workid = ''
				this.UserInfo.phone = ''
			}
		},
		//获取邮箱验证码
		async getEmailCode(){
			const Time_count = 60	
			var email={email:this.UserInfo.email}
			const {data:res} = await this.$http.get('get_emailcode',{ 
				params:email 
			})
			if(res.meta.status ==200){
				//更新token 
				// window.sessionStorage.removeItem("token");
				// window.sessionStorage.setItem("token",res.data.dict.token);
				if(!this.timer){
					this.count =Time_count;
					this.show =false
					this.timer = setInterval(()=>{
						if(this.count>0 && this.count <=Time_count){
							this.count--;
						}else{
							this.show = true
							clearInterval(this.timer)
							this.timer =null;
						}
					},1000)
				}
				return this.$message.success("发送成功")
			}else{
				return this.$message.error(res.meta.msg)
			}
		},
        // test1(){
        //     console.log(this.UserInfo.dep)
        // },
        //提交个人信息
        setuserinfo(){
			// 表单验证
			this.$refs.UserinfoRef.validate(async valid =>{ 
				if(!valid) return;
				const {data:res} = await this.$http.get('userinfo_up',{ 
					params:this.UserInfo
				})
				if(res.meta.status !==200){
					return this.$message.error(res.meta.msg);   
				}
				// 关闭申请框
				this.showuserinfoDialog = false
				this.showuserinfoDialogmerge = false
				this.$message.success(res.meta.msg)
				// 将修改后的个人信息存储到本地
				this.$cookies.set("email",res.data.dict.email,"7d")
				window.localStorage.setItem("email",this.UserInfo.email)
				window.localStorage.setItem("group",this.UserInfo.group)
				window.localStorage.setItem("local",this.UserInfo.local)
				window.localStorage.setItem("program",this.UserInfo.program)
				window.localStorage.setItem("workid",this.UserInfo.workid)
				window.localStorage.setItem("phone",this.UserInfo.phone)
				this.Userinfo.emailcode = ''
			});
        },
        // 首次登陆绑定信息
        isfirst(){
            // var test = false
			// this.firstlogin = test
			if(!this.$cookies.get("email") ||this.$cookies.get("email")=="null"|| window.localStorage.getItem("email")=="null"){
				this.showuserinfoDialogmerge = true
			}
        }
	}
};
</script>

<style lang="less" scoped>
.home_container {
	height: 100%;
}
.el-header {
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding-left: 0px;
	align-items: center;
	color: #fff;
	font-size: 18px;
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
	> div {
		display: flex;
		align-items: center;
		span {
			padding-left: 0px;
			margin-left: -12px;
		}
		img {
			width: 170px;
			margin-left: -10px;
			margin-top: 10px;
		}
	}
}
.el-aside {
	background-color: #333744;
	.el-menu {
		border-right: none;
	}
}
.el-main {
	background-color: #eaedf1;
}
.iconfont {
	margin-right: 10px;
}
.toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 20px;
	text-align: center;
	color: white;
	cursor: pointer;
}
#getcode{
	float: right;
}
</style>