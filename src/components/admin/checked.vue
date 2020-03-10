<template>
    <div>
            <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>借用审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--搜索区 -->
			<div style="margin-top: 15px;">
				<el-row :gutter="20">
					<el-col :span="10">
						<el-input
							placeholder="请输入借用信息"
							v-model="data.query"
							class="input-with-select"
							clearable
							@clear="getborrowlist"
						>
							<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
						</el-input>
					</el-col>
                    <el-button  round type="danger" size="mini"  @click="RemindAll" style="float:right">提示所有归还</el-button>
                    <el-button  round type="primary" size="mini" style="float:right;margin-bottom:10px;margin-right:30px" @click="cancelLock">取消锁定</el-button>
                    <el-button  round type="danger" size="mini" style="float:right;margin-bottom:10px;margin-right:20px" @click="Lock">一键锁定</el-button>
				</el-row>
			</div>
            <el-table :data="borrowlist" border style="width: 100%" stripe>
                <el-table-column type="index" label="序号" width="80" sortable align="center"></el-table-column>
                <el-table-column  label="申请人" sortable align="center">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="400" trigger="click">
                               <!-- {{userinfo}}  -->
                            <el-table :data="userinfo">
                                <el-table-column prop="user_name" label="姓名"></el-table-column>
                                <el-table-column prop="group" label="部门"></el-table-column>
                                <el-table-column prop="department" label="项目组"></el-table-column>
                                <el-table-column prop="local" label="座位号"></el-table-column>
                                <el-table-column prop="phone" label="手机号"></el-table-column>
                            </el-table>   
                            <el-button slot="reference" @click="getuserinfo1(scope.row.user.user_id)"  type="text" >{{scope.row.user.user_name}}</el-button>
                        </el-popover>
                    </template> 
                </el-table-column>     
                <el-table-column prop="start_time" label="借用日期" sortable align="center"></el-table-column>
                <el-table-column prop="equipment.title" label="设备编号" sortable align="center"></el-table-column>
                <el-table-column prop="equipment.name" label="设备名称" sortable align="center"></el-table-column>
                <el-table-column prop="plan_time" label="预计归还日期" sortable align="center"></el-table-column>
                <el-table-column prop="reason" label="借用理由" sortable align="center"></el-table-column>
                <el-table-column prop="state" label="状态" sortable align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
						<!-- {{scope.row}} -->
                         <div style="display:flex;">
						<el-button type="success" round v-if="scope.row.state==='待审核'" size="small" plain @click="MakeSureBorrow(scope.row.pk,true)" style="margin-left:15px">通过</el-button>
                        <el-button type="danger" round v-if="scope.row.state==='待审核'" size="small" plain @click="MakeSureBorrow(scope.row.pk,false)">不通过</el-button>
                         </div>
                        <div style="display:flex">
						    <el-button type="success" round v-if="scope.row.state==='借用中'" size="small" plain @click="MakeSureBacked(scope.row.pk)">确认归还</el-button>
                            <el-button type="primary" round v-if="scope.row.state==='借用中'" size="small" plain @click="Remind(scope.row.pk)">提示归还</el-button>
                        </div>
					</template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
	data() {
		return {
            borrowlist: [],
            data:{
                query:""
            },
            check:{
                id:"",
                ispass:""
            },
            userinfo:[{
                user_name:"",
                phone:"",
                group:'',
                department:"",
                local:''
            }],
            // userinfo:[]
		};
    },
    created(){
        this.getuserinfo()
        this.getborrowlist()
    },
    methods:{
        // 后台获取个人借用信息

       async getborrowlist(){
			const { data : res } = await this.$http.get("approval_list",{
                params:this.data
            });
			if (res.meta.status !== 200) {
				if(res.meta.status == 401){
                    this.$message.error("你还不是管理员");
					return this.$router.push('./login')
				}
				return this.$message.error(res.meta.msg);
			}
            // 后台获取的借用列表到前台
            this.borrowlist = res.data.dict.list;
        }, 
        // 锁定&取消锁定
        async Lock(){
            const {data:res} = await this.$http.get("lock_approval");
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg);
            }
            this.$message.success("所有在库设备已锁定");  
        },
        async cancelLock(){
            const {data:res} = await this.$http.get("unlock_approval");
            if (res.meta.status !== 200) {
                return this.$message.error(res.meta.msg);
            }
            this.$message.success("已取消锁定");
        },
        // 取消锁定
        search(){
            this.getborrowlist()
        },
        // 提醒归还
        async Remind(key){
            // var id=key
            var id ={"id":key}
            const {data:res} = await this.$http.get("tip_return_one",{
                params:id
            });
            if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
            }
            this.getborrowlist();
            this.$message.success("已提醒该借用人");             
        },            
        // 审批
        async MakeSureBorrow(pk,i){
            this.check.id = pk;
            this.check.ispass = i;
            const {data:res} = await this.$http.get("approval",{
                params:this.check
            });
            if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
            }
            this.getborrowlist();
            this.$message.success("操作成功");             
        },
        // 确认归还
        async MakeSureBacked(key){
            var id ={"id":key}
            const {data:res} = await this.$http.get("do_return",{
                params:id
            });
            if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
            }
            this.getborrowlist();
            this.$message.success("确认归还成功");   
        },
        // 提醒所有归还
        async RemindAll(){
            const {data:res} = await this.$http.get("tip_return_all");
            if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
            }
            this.getborrowlist();
            this.$message.success("已提醒所有借用人");            
        },
        // 查看用户信息
        async getuserinfo1(key){
            var id ={"id":key}
            const {data:res} = await this.$http.get("get_userinfo",{params:id})
            console.log(res)
            if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
            }
            // this.userinfo =  res.data.dict.equipment.fields
            this.userinfo[0].user_name = res.data.dict.equipment.fields.name
            this.userinfo[0]. phone = res.data.dict.equipment.fields. phone
            this.userinfo[0].group = res.data.dict.equipment.fields.group
            this.userinfo[0].department = res.data.dict.equipment.fields.department
            this.userinfo[0].local = res.data.dict.equipment.fields.local
           
        },
        getuserinfo(){
            //测试数据
            var demo = [
                {
                user:{
                    user_name:"王二",
                    user_id:123
                }, 
                equipment:{
                    title:9527,
                    name:'三星10'
                },
                start_time: "2016-05-03",
                state:"外借",
                plan_time:'2016-05-03',
                },
                {
                user:{user_name:"张三"}, 
                equipment:{
                    title:9528,
                    name:'三星9'
                },
                start_time: "2016-05-03",
                state:"待审批",
                plan_time:'2016-05-03',
                },
            ];
            // this.borrowlist = demo
        }
    }
};
</script>