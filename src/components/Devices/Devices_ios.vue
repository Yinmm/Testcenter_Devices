<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>iOS设备</el-breadcrumb-item>
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
				<el-table-column prop="DevicesId" label="设备id" sortable align="center"></el-table-column>
				<el-table-column prop="Name" label="设备名" sortable align="center"></el-table-column>
				<el-table-column prop="Brand" label="品牌" sortable align="center"></el-table-column>
				<el-table-column prop="System" label="系统" sortable align="center"></el-table-column>
				<el-table-column prop="Cpu" label="CPU" sortable align="center"></el-table-column>
				<el-table-column prop="Memory" label="内存" sortable align="center"></el-table-column>
				<el-table-column prop="Platform" label="平台" sortable align="center"></el-table-column>
				<el-table-column prop="Status" label="状态" sortable align="center"></el-table-column>
				<el-table-column prop="Brrower" label="借用人" sortable align="center"></el-table-column>
				<el-table-column label="申请借用" align="center">
					<template slot-scope="scope">
						<!-- {{scope.row}} -->
						<el-button
							type="primary"
							round
							:disabled="!scope.row.isBrrow"
							@click="showSupplyDilog(scope.row.DevicesId)"
						>申请</el-button>
					</template>
				</el-table-column>
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
		<!-- 申请页面弹出 -->
		<el-dialog title="申请信息" :visible.sync="AddSupplyDialog">
			<!-- 内容主体区 -->
			<el-form :model="supplyform" ref="supplyform" >
				<el-form-item label="设备id" :label-width="formLabelWidth">
					<el-input v-model="supplyform.deviceid" disabled></el-input>
				</el-form-item>
				<el-form-item label="归还时间" :label-width="formLabelWidth" prop="date">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="supplyform.date" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
			</el-form>
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddSupplyDialog = false">取 消</el-button>
				<el-button type="primary" @click="Supply">确 定</el-button>
			</div>
		</el-dialog>
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
                list_type:"ios"
			},
			input: "",
			//保存获取的设备列表
			userList: [],
			total: 0,
			DevicesList: [],
			DevicesData: [],
			// 控制申请页面的隐藏
			AddSupplyDialog: false,
			//申请设备提交信息
			supplyform: {
                usersid:"",
				deviceid: "",
				rtime: ""
			},
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
		// async getDevicesList() {
		// 	// 获取设备信息、每条显示数、每页显示数
		// 	const { data: res } = await this.$http.get("equip_list", {
		// 		params: this.queryInfo
		// 	});
		// 	if (res.meta.status !== 200) {
		// 		return this.$message.error("获取设备列表失败");
        //     }
        //     // 渲染到前台
		// 	// this.DevicesList = res.data.list;
		// 	this.total = res.data.total;
		// 	console.log(res);
		// },
		//从后台接口获取设备列表,测试数据
		getDevicesList() {
			var ListDemo = [
				{
					DevicesId: 7881245419527,
					Name: "小米9",
					Brand: "小米",
					System: "Android 9",
					Cpu: "骁龙835",
					Memory: "8G",
					Platform: "安卓",
					Status: "在库",
                    Brrower: "无",
                    isBrrow:true //是否可借用
				},
				{
					DevicesId: 9528,
					Name: "小米8",
					Brand: "小米",
					System: "Android 8",
					Cpu: "骁龙835",
					Memory: "4G",
					Platform: "安卓",
					Status: "在库", 
                    Brrower: "无",
                    isBrrow:true //是否可借用
				},
				{
					DevicesId: 9521,
					Name: "华为mate",
					Brand: "华为",
					System: "Android 5",
					Cpu: "骁龙835",
					Memory: "5G",
					Platform: "安卓",
					Status: "外借",
                    Brrower: "小明",
                    isBrrow:false //是否可借用
				}
			];
			this.DevicesList = ListDemo;
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
        showSupplyDilog(DevicesId){
            this.AddSupplyDialog = true
            // console.log(DevicesId)
            this.supplyform.deviceid = DevicesId
        },
        // 获取当前用户id,并传入申请栏中，**** 预先设计
        // async getUserid(usersid){
        //     const{ data:res } = await this.$http.get('users/'+ usersid)
        //     if(res.meta.status !==200){
        //         return this.$message.error('获取用户id失败')
        //     }
        //     this.supplyform.usersid = res.data.usersid 
        // },
		//进行提交申请
		async Supply(formname) {
            //接口提交申请信息 
            console.log(this.supplyform)
            // 预验证
            // this.$refs.supplyform.validate(valid =>{
            //     if(valid){
            //         alert("提交成功");
            //     }else{
            //         console.log('日期为空');
            //         return false
            //     }
            //     console.log(valid)})
            // 发起申请信息
            // 获取session中的userid，并传入申请表单中
            //  this.supplyform.usersid = window.sessionStorage.getItem("data.userid")
            const {data:res} = await this.$http.put('borrow_apply',{
                deviceid: this.supplyform.deviceid,
                date: this.supplyform.rtime
            })
            if(res.meta.status !==200){
                return this.$message.error('提交失败');   
            }
            //关闭申请框
            this.AddSupplyDialog = false
            // 刷新设备列表
            this.getDevicesList()
            //提示提交申请成功
            this.$message.success('提交成功')
            
        },
		//搜索事件
        Search() {},
        //监听提交申请框的关闭事件
        // closeAddSupply(){
        //     this.$refs.form.resetFields()
        // }
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