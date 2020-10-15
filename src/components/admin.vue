<template>
	<el-container class="home_container">
		<!-- 头部区 -->
		<el-header>
			<div>
				<img src="../assets/image/testcenter.png" alt />
				<span>管理员</span>
			</div>
			<el-row>
				<el-button type="success" @click="SelectOutType">导出设备信息</el-button>
				<!-- <el-button type="info" @click="logout">退出</el-button> -->
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
					<el-submenu :index="devices+'1'">
						<!-- 一级菜单模板区 -->
						<template slot="title">
							<!-- 图标 -->
							<i class="el-icon-mobile"></i>
							<!-- 文本 -->
							<span>设备列表</span>
						</template>
						<!-- 二级菜单 -->
						<!-- 实际列表 -->
						<el-menu-item index="admindevices">所有设备</el-menu-item>
						<el-menu-item index="admindevices_ios">
							<template slot="title">
								<i class="el-icon-apple"></i>
								<span>ios</span>
							</template>
						</el-menu-item>
						<el-menu-item index="admindevices_android">
							<template slot="title">
								<i class="el-icon-mobile-phone"></i>
								<span>Android</span>
							</template>
						</el-menu-item>
					</el-submenu>
					<el-submenu index="' '">
						<!-- 一级菜单模板区 -->
						<template slot="title">
							<!-- 图标 -->
							<i class="el-icon-setting"></i>
							<!-- 文本 -->
							<span>管理员操作</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item index="checked">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>借用审批</span>
							</template>
						</el-menu-item>
						<el-menu-item index="addnew">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>新增设备</span>
							</template>
						</el-menu-item>					
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 内容主体区 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
		<el-dialog title="选择导出信息" :visible.sync="outDialog" >
			<div style="margin-left:30%">
			<el-button type="primary" @click="outputInfo('')">全部</el-button>
			<el-button type="primary"  @click="outputInfo(2)">安卓</el-button>
			<el-button type="primary"  @click="outputInfo(1)">ios</el-button>
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
            // 个人信息
            UserInfo:{
                email:"",
                dep:"",
                seat:""
			},
            showuserinfoDialog: false, 
            formLabelWidth:"100px",
            userid:'',
			firstlogin: false,
			DevicesList: [],
			queryInfo: {
                type: "",
			},
			list:[],
			outDialog:false,
		};
	},
	created() {
		//this.getDevicesList()
	},
	methods: {
		logout() {
			// 清除token值
			window.sessionStorage.clear();
			// 重定向到登录页
			this.$router.push("/login");
		},
		//点击按钮切换折叠菜单
		toggleCollapse() {
			this.isCollapse = !this.isCollapse;
		},

		// 获取设备信息
		async getDevicesList() {
			// 获取设备信息、每条显示数、每页显示数
			const { data: res } = await this.$http.get("all_equip_info",{params: this.queryInfo});
			if (res.meta.status !== 200) {
				return this.$message.error("获取设备列表失败");
			}
			this.DevicesList = res.data.dict;
			this.list = this.DevicesList.list
			return this.DevicesList;
		},
		// 打开选择导出的类型
		SelectOutType(){
			this.outDialog = true;
		},
		// 导出表格
		outputInfo(type){
			this.DevicesList=[];
			this.queryInfo.type = type;
			let name ;
			if(type==1){
				name = "ios"
			}else if(type==2){
				name = "Android"
			}else{
				name="全部"
			}
			require.ensure([], async() => {
				const { export_json_to_excel } = require('../vendors/Export2Excel');
				const { data: res } = await this.$http.get("all_equip_info",{params: this.queryInfo});
				if (res.meta.status !== 200) {
					return this.$message.error("获取设备列表失败");
				}
				this.DevicesList = res.data.dict;
				this.list = this.DevicesList.list
				//console.log(this.DevicesList)
				var DevicesTotal = "设备总数 :  "+(String)(this.DevicesList.count_num);
				var LendTotal = "借出数量:  "+(String)(this.DevicesList.lend_num);
				var Stock = "在库数量:  "+(String)(this.DevicesList.stock_num);
				var a = parseFloat(this.DevicesList.lend_num)
				var b = parseFloat(this.DevicesList.count_num)
				var borrowrate = "借用率:  "+(String)((a/b).toFixed(2)*100+"%")
				const tHeader = ["设备编号","品牌","设备名称","内存","设备状态","借用人",DevicesTotal,LendTotal,Stock,borrowrate];//表头
				const filterVal = ["title","brand","name","ram","state","user_name"] //所需显示对应的字段
				const list1 =this.list
				const data = this.formatJson(filterVal, list1);
				export_json_to_excel(tHeader, data, '本月'+name+'设备信息汇总');
			})	
		},

　　　　 formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
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