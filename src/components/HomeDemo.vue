<template>
	<el-container class="home_container">
		<!-- 头部区 -->
		<el-header>
			<div>
				<img src="../assets/image/testcenter.png" alt />
				<span>设备借用平台</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!-- 页面主体区 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<!--折叠按钮 -->
				<div class="toggle-button" @click="toggleCollapse">点击折叠</div>
				<!-- 侧边栏菜单区域 -->
				<el-menu
					background-color="#333744"
					text-color="#fff"
					active-text-color="#409EFF"
					unique-opened
					:collapse="isCollapse"
                    :collapse-transition="false"
                    router="true"
				>
					<!-- 一级菜单 -->
					<el-submenu :index="item.id.toString()" v-for="item in menulist" :key="item.id">
						<!-- 一级菜单模板区 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconsObj[item.id]"></i>
							<!-- 文本 -->
							<span>{{item.authName}}</span>
							<!-- 实际文本 -->
							<!-- <span>设备列表</span> -->
						</template>
						<!-- 二级菜单 -->
						<el-menu-item
							:index="subItem.id.toString()"
							v-for="subItem in item.children"
							:key="subItem.id"
						>
							<!-- 二级菜单模板区 -->
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!-- 文本 -->
								<span>{{subItem.authName}}</span>
								<!-- <span>设备列表</span> -->
							</template>
						</el-menu-item>
						<!-- 实际列表 -->
						<!-- <el-menu-item index="1-2">ios</el-menu-item>
						<el-menu-item index="1-2">Android</el-menu-item>-->
					</el-submenu>
					<!-- <el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">个人借用</span>
					</el-menu-item>
					<el-menu-item index="4">
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
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			//左侧菜单数据
            menulist: [],
            iconsObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145': 'iconfont icon-baobiao'
            }, 
            //是否折叠
            isCollapse:false
		};
	},
	created() {
        this.getMenulist();
    },
	methods: {
		logout() {
			// 清除token值
			window.sessionStorage.clear();
			// 重定向到登录页
			this.$router.push("/login");
		},
		//获取所用菜单,动态渲染菜单列表
		async getMenulist() {
			const { data: res } = await this.$http.get("menus");
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
			this.menulist = res.data;
			console.log(res);
        },
        //点击按钮切换折叠菜单
        toggleCollapse(){ 
            this.isCollapse = !this.isCollapse
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
	font-size: 20px;
	font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
	> div {
		display: flex;
		align-items: center;
		span {
			padding-left: 0px;
			margin-left: -12px;
		}
		img {
			width: 200px;
			margin-left: -15px;
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