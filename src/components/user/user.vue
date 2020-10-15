<template>
    <div>
            <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人借用</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="borrowlist" border style="width: 100%" stripe>
                <el-table-column type="index" label="序号" width="80" sortable align="center"></el-table-column>
                <el-table-column prop="start_time" label="借用日期" sortable align="center"></el-table-column>
                <el-table-column prop="equipment.title" label="设备id" sortable align="center"></el-table-column>
                <el-table-column prop="equipment.name" label="设备名称" sortable align="center"></el-table-column>
                <el-table-column prop="plan_time" label="预计归还日期" sortable align="center"></el-table-column>
                <el-table-column prop="state" label="状态" sortable align="center"></el-table-column>
                <el-table-column  label="操作" align="center">
					<template slot-scope="scope">
					<el-button  type="primary" size="mini" round @click="showSupplyDilog2(scope.row.equipment.id)" >续借</el-button>
					</template>
				</el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="续借申请信息" :visible.sync="AddSupplyDialog2">
			<!-- 内容主体区 -->
			<el-form :model="supplyform" ref="supplyform">
				<el-form-item label="归还提醒邮箱" :label-width="formLabelWidth">
					<el-input v-model="supplyform.email"  disabled></el-input>
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
				<el-button type="primary" @click="mergeSupply" :disabled="isDisabled">确 定</el-button>
			</div>
		</el-dialog>

    </div>
</template>

<script>
export default {
	data() {
		return {
            borrowlist: [],
            AddSupplyDialog2:false,
            isDisabled:false,
            formLabelWidth:"120px",
            //申请设备提交信息
			supplyform: {
				deviceid: "",
				reason: "",
				rtime: "",
				email: ""
			},
		};
    },
    created(){
        this.getuserinfo()
    },
    methods:{
        // 后台获取个人借用信息
       async getuserinfo(){
			const { data: res } = await this.$http.get("borrow_list_user");
			if (res.meta.status !== 200) {
				return this.$message.error("获取信息失败");
            }
            // 后台获取的借用列表到前台
			this.borrowlist = res.data.dict.list;
			console.log(res);
		},
        // 显示紧急申请栏，并获取到设备id，用户邮箱
		showSupplyDilog2(id) {
			this.supplyform.rtime = '';
			this.AddSupplyDialog2 = true;
			// console.log(DevicesId)
			this.supplyform.deviceid = id;
			this.supplyform.email = this.$cookies.get("email");
        },
        // 紧急借用
		async mergeSupply(formname) {
			console.log(this.supplyform)
			this.timeDelay();
			const { data: res } = await this.$http.get("borrow_apply", {
				params: this.supplyform
			});
			if(this.supplyform.rtime==''){
				return this.$message.error("请填写归还时间！")
			}
			if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
			}
			//关闭申请框
			this.AddSupplyDialog2 = false;
			// 刷新设备列表
            this.getuserinfo()
			//提示提交申请成功
			this.$message.success("提交成功");
        },
        // 按钮延时
		timeDelay(){
			const Time_count = 5
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
    }
};
</script>