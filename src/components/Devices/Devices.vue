<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>所有设备</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区 -->
		<el-card>
			<!--搜索与添加区 -->
			<div class='nav' style="margin-top: 15px;">
				<el-row :gutter="20">
					<el-col :span="18">
						<el-input placeholder="请输入内容" v-model="input" class="input-with-select">
							<!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="品牌" value="1"></el-option>
                        <el-option label="内存" value="2"></el-option>
                        <el-option label="系统版本" value="3"></el-option>
							</el-select>-->
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-col>
					<!-- <el-col :span="6">
						<div class="grid-content bg-purple"></div>
					</el-col>-->
				</el-row>
			</div>
            <!-- 设备统计区 -->
            <el-table :data="DevicesData" style="width: 100%" border stripe height="100">
                <!-- 索引列 -->                             
			</el-table>
			<!-- 设备列表区 -->
			<el-table :data="tableData" style="width: 100%" border stripe height="1200">
                <!-- 索引列 -->
                <el-table-column type="index" label="序号" width='50' ></el-table-column>                   
				<el-table-column prop="DevicesId" label="设备id" width='150' sortable></el-table-column>
				<el-table-column prop="Name" label="设备名" sortable></el-table-column>
				<el-table-column prop="Brand" label="品牌" sortable></el-table-column>
				<el-table-column prop="System" label="系统" sortable></el-table-column>
 				<el-table-column prop="Cpu" label="处理器"></el-table-column>    
				<el-table-column prop="Rss" label="运行内存" width='110' sortable></el-table-column>
                <el-table-column prop="Platform" label="平台" sortable></el-table-column>
                <el-table-column prop="Status" label="状态" sortable></el-table-column>
                <el-table-column prop="Brrower" label="借用人"></el-table-column>                                
			</el-table>
		</el-card>
	</div>
</template>


<script>
export default {
	// 接口获取后台设备列表
	data() {
		return {
			//获取设备列表的参数对象
			queryInfo: {
				query: "",
				pagenum: 1,
				pagesize: 2
			},
			input: "",
			//保存获取的设备列表
			userList: [],
            total: 0 ,
            tableData:[{
                DevicesId : 7881245419527 ,
                Name :'小米9',
                Brand:'小米' ,
                System:'Android 9',
                Cpu : '骁龙835',
                Rss :'8G',
                Platform:'安卓',
                Status :'在库',
                Brrower:'无'
            },
            {
                DevicesId : 7881245419527 ,
                Name :'小米8',
                Brand:'小米' ,
                System:'Android 8',
                Cpu : '骁龙835',
                Rss :'4G',
                Platform:'安卓',
                Status :'在库',
                Brrower:'无'
            },
            {
                DevicesId : 7881245419527 ,
                Name :'华为mate',
                Brand:'华为' ,
                System:'Android 5',
                Cpu : '骁龙835',
                Rss :'5G',
                Platform:'安卓',
                Status :'外借',
                Brrower:'无'
            }]
		};
	},
	created() {
		//获取设备列表
		this.getUserList();
	},
	methods: {
		// 请求后台参数,并获取
		async getUserList() {
			const { data: res } = await this.$http.get("users", {
				params: this.queryInfo
			});
			if (res.meta.status !== 200) {
				return this.$message.error("获取设备列表失败");
			}
			this.userList = res.data.users;
			this.total = res.data.total;
			console.log(res);
		}
	}
};
</script>

<style lang="less" scoped>
    .nav{
        margin-bottom: 10px
    }
</style>>