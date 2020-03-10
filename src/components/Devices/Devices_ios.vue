<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
				<el-table-column prop="title" label="设备编号" sortable align="center"></el-table-column>
				<el-table-column prop="name" label="设备名" sortable align="center"></el-table-column>
				<el-table-column prop="brand" label="品牌" sortable align="center" ></el-table-column>
				<el-table-column prop="udid" label="udid" sortable align="center" ></el-table-column>
				<el-table-column prop="resolution" label="分辨率" sortable align="center" ></el-table-column>
				<el-table-column prop="system" label="系统" sortable align="center"></el-table-column>
				<el-table-column prop="cpu" label="CPU" sortable align="center"></el-table-column>
				<el-table-column prop="gpu" label="GPU" sortable align="center" ></el-table-column>
				<el-table-column prop="ram" label="内存" sortable align="center"></el-table-column>
				<el-table-column prop="platform" label="平台" sortable align="center" ></el-table-column>
				<el-table-column  label="状态" align="center">
					<template slot-scope="scope">
						<el-tag type="sucess" round v-if="scope.row.state==='在库'" effect="plain">在库</el-tag>
						<el-tag type="info" round v-if="scope.row.state==='借出'"  effect="plain">借出</el-tag>
						<el-tag type="warning" round v-if="scope.row.state==='审批中'" effect="plain">审批中</el-tag>
						<el-tag type="danger" round v-if="scope.row.state==='锁定中'" effect="plain">锁定中</el-tag>
					</template></el-table-column>
				<el-table-column prop="user_name" label="借用人" sortable align="center"></el-table-column>
				<el-table-column label="申请借用" align="center">
					<template slot-scope="scope">
						<!-- {{scope.row}} -->
						<el-button type="primary" round v-if="scope.row.state==='在库'" @click="showSupplyDilog1(scope.row.id)">申请</el-button>
						<el-button type="danger" round v-if="scope.row.state!=='在库'" @click="showSupplyDilog2(scope.row.id)">紧急申请</el-button>
					</template>
				</el-table-column>
			</el-table>			
			<!-- 分页区 -->
			<!-- 可以根据数据库返回结果进行动态绑定 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 30, 60, 90]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
		<!-- 申请页面弹出 -->
		<el-dialog title="申请信息" :visible.sync="AddSupplyDialog1">
			<!-- 内容主体区 -->
			<el-form :model="supplyform" ref="supplyform">
				<el-form-item label="归还提醒邮箱" :label-width="formLabelWidth">
					<el-input v-model="supplyform.email"></el-input>
				</el-form-item>
				<el-form-item label="归还时间" :label-width="formLabelWidth" prop="date">
					<el-col :span="11">
						<el-date-picker
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
							v-model="supplyform.rtime"
							style="width: 100%;"
						></el-date-picker>
					</el-col>
				</el-form-item>
			</el-form>
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddSupplyDialog1 = false">取 消</el-button>
				<el-button type="primary" @click="Supply">确 定</el-button>
			</div>
			<!-- 紧急借用申请弹窗 -->
		</el-dialog>
		<el-dialog title="紧急申请信息" :visible.sync="AddSupplyDialog2">
			<!-- 内容主体区 -->
			<el-form :model="supplyform" ref="supplyform">
				<el-form-item label="归还提醒邮箱" :label-width="formLabelWidth">
					<el-input v-model="supplyform.email"></el-input>
				</el-form-item>
				<el-form-item label="申请理由" :label-width="formLabelWidth">
					<el-input v-model="supplyform.reason"></el-input>
				</el-form-item>
				<el-form-item label="归还时间" :label-width="formLabelWidth" prop="date">
					<el-col :span="11">
						<el-date-picker
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
							v-model="supplyform.rtime"
							style="width: 100%;"
						></el-date-picker>
					</el-col>
				</el-form-item>
			</el-form>
			<!-- 底部区 -->
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddSupplyDialog2 = false">取 消</el-button>
				<el-button type="primary" @click="mergeSupply">确 定</el-button>
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
                // 获取设备类型
                list_type:"IOS"
			},
			input: "",
			//保存获取的设备列表
			userList: [],
			total: 0,
			DevicesList: [],
			DevicesData: [],
			// 控制申请页面的隐藏
			AddSupplyDialog1: false,
			AddSupplyDialog2: false,
			//申请设备提交信息
			supplyform: {
				deviceid: "",
				reason: "",
				rtime: "",
				email: ""
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
		async getDevicesList() {
			// 获取设备信息、每条显示数、每页显示数
			const {data:res} = await this.$http.get("equip_list", {
				params: this.queryInfo
			});
			console.log(res)
			if (res.meta.status !== 200) {
				return this.$message.error("获取设备列表失败");
            }
			// 后台获取的设备列表渲染到前台
			this.DevicesList = res.data.dict.list;
			this.total = res.data.dict.total;
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
		// 显示申请栏，并获取到设备id，用户邮箱
		showSupplyDilog1(DeviceId) {
			this.AddSupplyDialog1 = true;
			this.supplyform.reason = ''
			// console.log(DevicesId)
			this.supplyform.deviceid = DeviceId;
			this.supplyform.email = window.sessionStorage.getItem("email");
		},
		// 显示紧急申请栏，并获取到设备id，用户邮箱
		showSupplyDilog2(DeviceId) {
			this.AddSupplyDialog2 = true;
			// console.log(DevicesId)
			this.supplyform.deviceid = DeviceId;
			this.supplyform.email = window.sessionStorage.getItem("email");
		},
		//进行提交申请
		async Supply(formname) {
			//接口提交申请信息 
			this.supplyform.userid = window.sessionStorage.getItem('userid')
            const {data:res} = await this.$http.get("borrow_apply",{
				params: this.supplyform
            });
            if(res.meta.status !==200){
                return this.$message.error('提交失败');   
            }
            //关闭申请框
            this.AddSupplyDialog1 = false
            // 刷新设备列表
            this.getDevicesList()
            //提示提交申请成功
            this.$message.success('提交成功')
            
		},
		// 紧急借用
		async mergeSupply(formname) {
			const { data: res } = await this.$http.get("borrow_apply", {
				params: this.supplyform
			});
			if (res.meta.status !== 200) {
				return this.$message.error("提交失败");
			}
			//关闭申请框
			this.AddSupplyDialog2 = false;
			// 刷新设备列表
			this.getDevicesList();
			//提示提交申请成功
			this.$message.success("提交成功");
		},
		//搜索事件
        Search() {
            // console.log(this.queryInfo.query)
            this.getDevicesList()
        }
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