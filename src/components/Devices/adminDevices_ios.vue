<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>ios设备</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区 -->
		<el-card>
			<!--搜索区 -->
			<div class="nav" style="margin-top: 15px;">
				<el-row :gutter="20">
					<el-col :span="18">
						<el-input
							placeholder="请输入内容"
							v-model="queryInfo.query"
							class="input-with-select"
							clearable
							@clear="getDevicesList"
						>
							<el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
						</el-input>
					</el-col>
					<!-- <el-col :span="6">
						<div class="grid-content bg-purple"></div>
					</el-col>-->
				</el-row>
			</div>
			<!-- 设备统计区 -->
			<!-- 设备列表区 -->
			<el-table :data="DevicesList" style="width: 100%" border stripe>
				<!-- 索引列 -->
				<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
				<!-- <el-table-column prop="mobile" label="测试" sortable align="center"></el-table-column>                -->
				<el-table-column prop="title" label="设备id" sortable align="center"></el-table-column>
				<el-table-column prop="name" label="设备名" sortable align="center"></el-table-column>
				<el-table-column prop="brand" label="品牌" sortable align="center"></el-table-column>
				<el-table-column prop="udid" label="udid" sortable align="center" ></el-table-column>
				<el-table-column prop="resolution" label="分辨率" sortable align="center" ></el-table-column>
				<el-table-column prop="system" label="系统" sortable align="center"></el-table-column>
				<el-table-column prop="cpu" label="CPU" sortable align="center"></el-table-column>
				<el-table-column prop="ram" label="内存" sortable align="center"></el-table-column>
				<el-table-column prop="platform" label="平台" sortable align="center"></el-table-column>
				<el-table-column  label="状态" sortable align="center">
					<template slot-scope="scope">
						<el-tag type="sucess" round v-if="scope.row.state==='在库'" effect="plain">在库</el-tag>
						<el-tag type="info" round v-if="scope.row.state==='借出'"  effect="plain">借出</el-tag>
						<el-tag type="warning" round v-if="scope.row.state==='审批中'" effect="plain">审批中</el-tag>
						<el-tag type="danger" round v-if="scope.row.state==='锁定中'" effect="plain">锁定中</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" label="借用人" sortable align="center"></el-table-column>			
			</el-table>
			<!-- 分页区 -->
			<!-- 可以根据数据库返回结果进行动态绑定 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 2, 30, 120]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
	</div>
</template>


<script>
export default {
	// 接口获取后台设备列表
	data() {
        //申请表单中验证日期的校验规则
        // var checkdate = (rule, value, callback) => {
        //     if (!value) {
        //     return callback(new Error('日期不能为空'))
        // }};
		return {
			//获取设备列表的参数对象
			queryInfo: {
				query: "",
				// 当前的页数
				pagenum: 1,
				// 当前每页显示多少条数据
                pagesize: 30,
                // 获取设备类型
                list_type:"IOS"
			},
			input: "",
			//保存获取的设备列表
			userList: [],
			total: 0,
			DevicesList: [],
			DevicesData: [],
            formLabelWidth: "120px",
            // DateRules:{
            //     date:{ validator: checkdate, trigger: 'blur' }
			// }
        }
	},
	created() {
		//获取设备列表
		// this.getUserList();
		this.getDevicesList();
		// this.Supply();
        // this.Search();
	},
	methods: {
		// 请求后台参数,并获取设备列表
		async getDevicesList() {
			// 获取设备信息、每条显示数、每页显示数
			const {data:res} = await this.$http.get("equip_list", {
				params: this.queryInfo
			});
			if (res.meta.status !== 200) {
				if(res.meta.status == 401){
					this.$message.error("你还不是管理员");
					return this.$router.push('./login')
				}
				return this.$message.error(res.meta.msg);
			}
			// 后台获取的设备列表渲染到前台
			this.DevicesList = res.data.dict.list;
			this.total = res.data.dict.total;
			console.log(this.DevicesList);
		},
		//监听pagesize改变
		handleSizeChange(newSize) {
			console.log(newSize);
			this.queryInfo.pagesize = newSize;
			this.getDevicesList();
		},
		//监听页码改变
		handleCurrentChange(newPage) {
			// console.log(newPage)
			this.queryInfo.pagenum = newPage;
			this.getDevicesList();
        },
        // 显示申请栏，并获取到设备id
        showSupplyDilog(DeviceId){
            this.AddSupplyDialog = true
            // console.log(DevicesId)
            this.supplyform.deviceid = DeviceId
        },
		//搜索事件
        Search() {
            // console.log(this.queryInfo.query)
            this.getDevicesList()
        }
	},
};
</script>

<style lang="less" scoped>
.nav {
	margin-bottom: 10px;
}
.button {
	margin: 10px;
}
</style>>