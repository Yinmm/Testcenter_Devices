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
       async getuserinfo(){
			const { data: res } = await this.$http.get("borrow_list_user");
			if (res.meta.status !== 200) {
				return this.$message.error("获取信息失败");
            }
            // 后台获取的借用列表到前台
			this.borrowlist = res.data.dict.list;
			console.log(res);
		}
        // getuserinfo(){
        //     //测试数据
        //     var demo = [
        //         {
        //         equipment:{
        //             title:9527,
        //             name:'三星10'
        //         },
        //         start_time: "2016-05-03",
        //         state:"借用中",
        //         plan_time:'2016-05-03',
        //         },
        //     ];
        //     this.borrowlist = demo
        // }
    }
};
</script>