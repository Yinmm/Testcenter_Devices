<template>
	<el-container class="home_container">
		<!-- 头部区 -->
		<el-header>
			<div>
				<img src="../assets/image/testcenter.png" alt />
				<span>设备借用平台</span>
			</div>
			<el-row>
				<el-button type="success" style="margin-right:0px" @click="setemail">绑定邮箱</el-button>
				<el-button type="info" @click="logout">退出</el-button>
			</el-row>
		</el-header>
		<!-- 页面主体区 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<!--折叠按钮 -->
				<div class="toggle-button" @click="toggleCollapse">折叠</div>
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
							<!-- 实际文本 -->
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
					<!-- <el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">设备管理</span>
					</el-menu-item>-->
				</el-menu>
			</el-aside>
			<!-- 内容主体区 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
        <!-- 申请页面弹出 -->
		<el-dialog title="绑定邮箱" :visible.sync="showEmailDialog">
			<!-- 内容主体区 -->
			<el-form >
				<el-form-item label="输入热聊邮箱" :label-width="formLabelWidth">
					<el-input v-model="Email" ></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="showEmailDialog = false">取 消</el-button>
				<el-button type="primary" @click="setEmail">确 定</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>

<script>
export default {
	data() {
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
            // 邮箱
            Email:"",
            showEmailDialog: false, 
            formLabelWidth:"100px",
            userid:'',
            
		};
	},
	created() {
		// this.getMenulist();
	},
	methods: {
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
        //绑定邮箱按钮事件
        setemail(){
            this.showEmailDialog = true
        },
        //提交邮箱
        async setEmail(){
            // console.log(this.userid = "9527",this.Email)
            // 向后台提交， this.Email，
            // 从session中获取userid
            this.userid = window.sessionStorage.getItem(data,{user_id})
            const {data:res} = await this.$http.post('user',{
                userid: this.userid,
                email: this.Email
            })
            if(res.meta.status !==200){
                return this.$message.error('绑定失败');   
            }
            // 关闭申请框
            this.showEmailDialog = false
            this.$message.success('绑定成功')
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
</style>