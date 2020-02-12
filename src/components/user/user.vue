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
                <el-table-column prop="date" label="借用日期" sortable align="center"></el-table-column>
                <el-table-column prop="id" label="设备id" sortable align="center"></el-table-column>
                <el-table-column prop="name" label="设备名称" sortable align="center"></el-table-column>
                <el-table-column prop="date2" label="预计归还日期" sortable align="center"></el-table-column>
                <el-table-column prop="isback" label="是否已归还" sortable align="center">
                    <template slot-scope="scope">
                        {{scope.row.isback}}  
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
			borrowlist: []
		};
    },
    created(){
        this.getuserinfo()
    },
    methods:{
        // 后台获取个人借用信息
    //    async getuserinfo(){
	// 		const { data: res } = await this.$http.post("borrow_list_user");
	// 		if (res.meta.status !== 200) {
	// 			return this.$message.error("获取信息失败");
    //         }
    //         // 后台获取的借用列表到前台
	// 		this.borrowlist = res.data.list;
	// 		console.log(res);
	// 	},
        getuserinfo(){
            //测试数据
            var demo = [
                {
                date: "2016-05-03",
                id: "9527",
                name: "三星",
                date2:'2016-05-03',
                isback:false //true 为归还，false为未归还
                },{
                date: "2016-05-03",
                id: "9527",
                name: "三星",
                date2:'2016-05-03',
                isback:true
                },{
                date: "2016-05-03",
                id: "9527",
                name: "三星",
                date2:'2016-05-03',
                isback:false
				},
            ];
            this.borrowlist = demo
        }
    }
};
</script>