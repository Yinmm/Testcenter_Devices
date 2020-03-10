<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>所有设备</el-breadcrumb-item>
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
					<el-button  id='showinfo' round plain type="info" @click="showAllinfo" style="margin-right:0px" size="mini">显示设备所有信息</el-button>
				</el-row>
			</div>
			<!-- 设备筛选区 1-->
			<el-collapse v-model="activenames">
				<el-collapse-item title="设备筛选 :" name ="1">
					<div id ="choice">
						<section id="section">
							<!-- <nav id="choose">
								<mark v-for="(item,key) in choose" :key="item"  @click="delFn(key)">
									{{item}}
									<a href="javascript:;">x</a>
								</mark>
							</nav> -->
							<ul id="type">
								<li >
									{{dataList[0].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll0" @change="allchannge0" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.brand" @change="singleChange0">
											<el-checkbox v-for="value in dataList[0].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>						
								</li>
							<li >
									{{dataList[1].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll1" @change="allchannge1" >全选</el-checkbox>
										<el-checkbox-group v-model="android" @change="singleChange1">
											<el-checkbox v-for="value in dataList[1].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[2].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll2" @change="allchannge2" >全选</el-checkbox>
										<el-checkbox-group v-model="ios" @change="singleChange2">
											<el-checkbox v-for="value in dataList[2].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[3].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll3" @change="allchannge3" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.cpu" @change="singleChange3">
											<el-checkbox v-for="value in dataList[3].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[4].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll4" @change="allchannge4" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.gpu" @change="singleChange4">
											<el-checkbox v-for="value in dataList[4].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[5].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll5" @change="allchannge5" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.ram" @change="singleChange5">
											<el-checkbox v-for="value in dataList[5].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[6].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll6" @change="allchannge6" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.screen" @change="singleChange6">
											<el-checkbox v-for="value in dataList[6].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[7].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll7" @change="allchannge7" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.resolution" @change="singleChange7">
											<el-checkbox v-for="value in dataList[7].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>
							<li >
									{{dataList[8].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<el-checkbox id="i" :v-model="checkAll8" @change="allchannge8" >全选</el-checkbox>
										<el-checkbox-group v-model="queryInfo.filter_list.state" @change="singleChange8">
											<el-checkbox v-for="value in dataList[8].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>																																																						
							</ul>
						</section>
					</div>
				</el-collapse-item>
			</el-collapse>	
			<!-- 设备列表区 -->
			<el-table :data="DevicesList" style="width: 100%" border stripe >
				<!-- 索引列 -->
				<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
				<!-- <el-table-column prop="mobile" label="测试" sortable align="center"></el-table-column>                -->
				<el-table-column prop="title" label="设备编号" sortable align="center" v-if="show"></el-table-column>
				<el-table-column prop="name" label="设备名" sortable align="center"></el-table-column>
				<el-table-column prop="udid" label="udid" sortable align="center" v-if="show"></el-table-column>
				<el-table-column prop="brand" label="品牌" sortable align="center" ></el-table-column>
				<el-table-column prop="resolution" label="分辨率" sortable align="center" ></el-table-column>
				<el-table-column prop="screen" label="屏幕类型" sortable align="center" ></el-table-column>
				<el-table-column prop="system" label="系统" sortable align="center"></el-table-column>
				<el-table-column prop="cpu" label="CPU" sortable align="center"></el-table-column>
				<el-table-column prop="gpu" label="GPU" sortable align="center" v-if="show"></el-table-column>
				<el-table-column prop="ram" label="内存" sortable align="center"></el-table-column>
				<el-table-column prop="platform" label="平台" sortable align="center" v-if="show"></el-table-column>
				<el-table-column  label="状态" 
				align="center">
					<template slot-scope="scope">
						<el-tag type="sucess" round v-if="scope.row.state==='在库'" effect="plain">在库</el-tag>
						<el-tag type="info" round v-if="scope.row.state==='借出'"  effect="plain">借出</el-tag>
						<el-tag type="warning" round v-if="scope.row.state==='审批中'" effect="plain">审批中</el-tag>
						<el-tag type="danger" round v-if="scope.row.state==='锁定中'" effect="plain">锁定中</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" label="保管人" sortable align="center"></el-table-column>
				<el-table-column  label="设备信息修改" align="center">
					<template slot-scope="scope">
					<el-button type="primary" round @click="UpdateDevice(scope.row)" >修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区 -->
			<!-- 可以根据数据库返回结果进行动态绑定 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[10, 30, 60, 90]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
		<!-- 信息弹出区 -->
		<el-dialog title="设备信息更改" :visible.sync="ShowDeviceInfoDialog" >
 			<el-form ref="AddNewDevices" :model="AddNewDevices" label-width="80px" style="width:100% margin:auto">
				<el-form-item label="设备编号">
					<el-input v-model="AddNewDevices.title"  style="width:25%"></el-input>
				</el-form-item>
				<el-form-item label="UDID">
					<el-input v-model="AddNewDevices.udid"  style="width:25%"></el-input>
				</el-form-item>
				<el-form-item label="设备名称">
					<el-input v-model="AddNewDevices.name"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="品牌">
					<el-input v-model="AddNewDevices.brand"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="处理器">
					<el-input v-model="AddNewDevices.cpu"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="GPU">
					<el-input v-model="AddNewDevices.gpu"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="系统">
					<el-input v-model="AddNewDevices.system"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="分辨率">
					<el-input v-model="AddNewDevices.resolution"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="屏幕类型">
					<el-select v-model="AddNewDevices.screen" placeholder="请选择屏幕类型">
						<el-option label="水滴屏" value="水滴屏"></el-option>
						<el-option label="曲面屏" value="曲面屏"></el-option>
						<el-option label="普通屏" value="普通屏"></el-option>
						<el-option label="刘海屏" value="刘海屏"></el-option>
						<el-option label="全面屏" value="全面屏"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="运行内存">
					<el-input v-model="AddNewDevices.ram"  style="width:15%"></el-input>
				</el-form-item>
				<el-form-item label="平台">
					<el-select v-model="AddNewDevices.platform" placeholder="请选择平台">
						<el-option label="Android" value="android"></el-option>
						<el-option label="ios" value="ios"></el-option>
						</el-select>
				</el-form-item>                              
            <div style="text-align:center">
                <el-button type="primary"  round @click="submitForm">提交</el-button>
				<el-button type="primary" round @click="cancelsubmitForm" >取消</el-button>
            </div>
    	 	</el-form>			
		</el-dialog>
	</div>
</template>


<script>
    const DeviceType = [
               { 
                title:"品牌",
                list:["苹果","小米","华为","三星","OPPO","vivo","魅族","红米","一加"]
                },
               { 
                title:"android系统",
                list:["Android10","Android9","Android8","Android7","Android6","Android5","Android4"]
				},
          		{ 
                title:"ios系统",
                list:["ios13","ios12","ios11","ios10","ios9"]
				},
				{ 
                title:"CPU",
                list:["骁龙","麒麟","联发科","Exynos"]
				},								
               { 
                title:"GPU",
				list:["高通","Mali","IMG","PowerVR","ARM"]
				},
				{
				title:"内存",
                list:["8G","6G","4G","3G","2G"]
				},						
               { 
                title:"屏幕类型",
                list:["水滴屏","曲面屏","普通屏","刘海屏","全面屏"]
				},
               { 
                title:"分辨率",
				list:["1280x720","1080x1920","2556x1080","2340x1080","2460x1080","2560x1440",]
                },				
               { 
                title:"状态",
                list:["在库","借出","审批中","锁定中"]
                },				
			];
export default {
    // 接口获取后台设备列表
	data() {
		return {
			//获取设备列表的参数对象
			//筛选的安卓&ios系统
			android:[],
			ios:[],
			queryInfo: {
				query: "",
				// 当前的页数
				pagenum: 1,
				// 当前每页显示多少条数据
				pagesize: 30,
				// 获取设备类型
                list_type: "",
                filter_list:{
					"brand":[],
					"system":[],
					"cpu":[],
					"gpu":[],
					"ram":[],
					"screen":[],
					"resolution":[],
					"state":[],
				}
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
            dataList:DeviceType,
			show :false,
			// test用
			checkAll0:true,
			checkAll1:true,
			checkAll2:true,
			checkAll3:true,
			checkAll4:true,
			checkAll5:true,
			checkAll6:true,
			checkAll7:true,
			checkAll8:true,
			//绑定折叠面板name
			activenames:['1'],
			// 修改设备面板
			AddNewDevices: {
				id:'',
				title: "",
				udid: "",
				name: "",
				brand: "",
				cpu: "",
				gpu: "",
				system: "",
				resolution: "",
				screen: "",
				ram: "",
				platform: ""
			  },
			ShowDeviceInfoDialog:false,
			// 设备标识
        };
	},
	created() {
		//获取设备列表
		// this.getUserList();
		this.getDevicesList();
		// this.Supply();
        // this.Search();
		// 处理设备筛选数据
	},
	methods: {
		// 请求后台参数,并获取设备列表
		async getDevicesList() {
			// 获取设备信息、每条显示数、每页显示数
			const { data: res } = await this.$http.get("equip_list", {
				params: this.queryInfo
			});
			if (res.meta.status !== 200) {
				return this.$message.error(res.meta.msg);
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
		//搜索事件
		Search() {
			// console.log(this.queryInfo.query)
			this.getDevicesList();
		},
		//显示所有信息
		showAllinfo(){
			this.show = !this.show
		},
		// 修改设备
		UpdateDevice(data){
			console.log(data)
			this.AddNewDevices.id = data.id
			this.AddNewDevices.title = data.title
			this.AddNewDevices.udid = data.udid
			this.AddNewDevices.name = data.name
			this.AddNewDevices.brand = data.brand
			this.AddNewDevices.cpu = data.cpu
			this.AddNewDevices.gpu = data.gpu
			this.AddNewDevices.system = data.system
			this.AddNewDevices.resolution = data.resolution
			this.AddNewDevices.screen = data.screen
			this.AddNewDevices.ram = data.ram
			this.AddNewDevices.platform = data.platform
			this.ShowDeviceInfoDialog=true
	

		},
		// 提交设备修改信息
		async submitForm() {
      		const { data: res } = await this.$http.get("equip_update", {
        	params: this.AddNewDevices
      		});
      		if (res.meta.status !== 200) {
				if(res.meta.status == 401){
					this.$message.error("你还不是管理员");
					return this.$router.push('./login')
				}
        	return this.$message.error("修改设备失败");
      	}
			this.$message.success("修改设备成功");
			this.ShowDeviceInfoDialog=false,
			this.getDevicesList()

    	},
		// 取消提交设备修改信息
		cancelsubmitForm(){
			this.ShowDeviceInfoDialog = false
		},
		//筛选方法
			allchannge0(val) {
				this.queryInfo.filter_list.brand = val ? this.dataList[0].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();
			},
			singleChange0(value) {
				let checkedCount = value.length;
				this.checkAll0 = checkedCount === this.dataList[0].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();
			},
			allchannge1(val) {
				this.android = val ? this.dataList[1].list : [];
				this.queryInfo.filter_list.system = this.android.concat(this.ios)
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange1(value) {
				this.queryInfo.filter_list.system = this.android.concat(this.ios)
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			allchannge2(val) {
				this.ios = val ? this.dataList[2].list : [];
				this.queryInfo.filter_list.system = this.android.concat(this.ios)
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange2(value) {
				this.queryInfo.filter_list.system = this.android.concat(this.ios)
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},				  
			allchannge3(val) {
				this.queryInfo.filter_list.cpu = val ? this.dataList[3].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange3(value) {
				let checkedCount = value.length;
				this.checkAll3 = checkedCount === this.dataList[3].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			allchannge4(val) {
				this.queryInfo.filter_list.gpu = val ? this.dataList[4].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange4(value) {
				let checkedCount = value.length;
				this.checkAll4 = checkedCount === this.dataList[4].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			allchannge5(val) {
				this.queryInfo.filter_list.ram = val ? this.dataList[5].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange5(value) {
				let checkedCount = value.length;
				this.checkAll5 = checkedCount === this.dataList[5].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			allchannge6(val) {
				this.queryInfo.filter_list.screen = val ? this.dataList[6].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange6(value) {
				let checkedCount = value.length;
				this.checkAll6 = checkedCount === this.dataList[6].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},

			allchannge7(val) {
				this.queryInfo.filter_list.resolution = val ? this.dataList[7].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange7(value) {
				let checkedCount = value.length;
				this.checkAll7 = checkedCount === this.dataList[7].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			allchannge8(val) {
				this.queryInfo.filter_list.state = val ? this.dataList[8].list : [];
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
			singleChange8(value) {
				let checkedCount = value.length;
				this.checkAll8 = checkedCount === this.dataList[8].list.length;
				this.queryInfo.pagenum=1
				this.getDevicesList();			
			},
	}
};
</script>

<style lang="less" scoped>
.nav {
	margin-bottom: 10px;
}
.button {
	margin: 10px;
}
#showinfo{
	float:right;
	align-items: center;
}
.el-checkbox-group{
	display: inline;
}
#i{
	margin-right: 20px
}
#choice {
    width: 100%;
    height: 420px;
    // background: url(img/bg.jpg) no-repeat 0 0;
}
#section {
    width: 100%px;
    height: 405px;
    box-shadow: 0px 0px 2px rgba(0,0,0,.2);
    margin-bottom: 0px
}
#choose {
    width: 100%;
    height: 50px;
    // background: url(img/nav_bg.png) no-repeat 0 0;
    line-height: 50px;
    text-indent: 21px;
}
#type {
    width: 100%;
    height: 210px;
    // background: url(img/type_bg.png) no-repeat 0 0;
    padding: 17px 0 16px 28px;
	margin-top: 0 ;

	
}
#type li {
    height: 44px;
    color: #8a8a8a;
	line-height: 44px;
	list-style-type:none

}
#type a {
    margin: 0 12px 0 11px;
    color: rgb(105, 83, 83);
	text-decoration:none;
	font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
}
#choose mark {
    position: relative;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    border: 1px solid #00ff00;
    color: #00ff00;
    margin: 12px 5px 0;
    background: none;
    padding: 0 30px 0 6px;
    text-indent: 0;
}
#choose mark a {
    position: absolute;
    top: 3px;
    right: 2px;
    display: inline-block;
    width: 18px;
    height: 18px;
    background:  #00ff00;
    color: #fff;
    line-height: 18px;
    font-size: 16px;
    text-align: center;
    text-decoration: none
}
.active {
    background:   #00ff00
}

</style>>