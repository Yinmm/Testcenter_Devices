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
							@keyup.enter.native = "Search"
						>
							<el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
						</el-input>
					</el-col>
					<!-- <el-col :span="6">
						<div class="grid-content bg-purple"></div>
					</el-col>-->
					<el-button  id='showinfo' round plain type="info" @click="showAllinfo" style="margin-right:0px" size="mini">显示设备所有信息</el-button>
				</el-row>
			</div>
			<!-- 设备筛选区 1-->
			<el-collapse v-model="activenames" >
				<!-- 默认关闭，打开在el-collapse-item 加上 name = "1" -->
				<el-collapse-item title="设备筛选 : >>>" name="1" > 
					<div id ="choice">
						<section id="section">
							<!-- <nav id="choose">
								<mark v-for="(item,key) in choose" :key="item"  @click="delFn(key)">
									{{item}}
									<a href="javascript:;">x</a>
								</mark>
							</nav> -->
							<ul id="type" v-if="dataList !==null">
								<li>
									{{dataList[0].title}}:
									<template >
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll0" @change="allchannge0" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.brand" @change="singleChange0">
											<el-checkbox  v-for="(value,index) in dataList[0].list" :label="value" :key="value"  v-show="isOpen|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen && dataList[0].list.length>Max" @click="isOpen =!isOpen" type="text">展开 </el-button>
										<el-button v-show="isOpen && dataList[0].list.length>Max" @click="isOpen =!isOpen"  type="text">收起 </el-button>
									</template>							
									<!-- <a v-for="(value,j) in item.list"  :key="j" href="javascript:;" v-bind:class="{active:item.index===j}" @click="showFn(value,i,j)">
									{{value}}    
									</a> -->
								</li>
							<li >
									{{dataList[1].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll1" @change="allchannge1" >全选</el-checkbox> -->
										<el-checkbox-group v-model="android" @change="singleChange1">
											<el-checkbox :disabled="show2" v-for="(value,index) in dataList[1].list" :label="value" :key="value"  v-show="isOpen1|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen1 && dataList[1].list.length>Max" @click="isOpen1 =!isOpen1" type="text">展开 </el-button>
										<el-button v-show="isOpen1 && dataList[1].list.length>Max" @click="isOpen1 =!isOpen1"  type="text">收起 </el-button>
									</template>							
								</li>
							<li >
									{{dataList[2].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll2" @change="allchannge2" >全选</el-checkbox> -->
										<el-checkbox-group v-model="ios" @change="singleChange2">
											<el-checkbox :disabled="show3" v-for="(value,index) in dataList[2].list" :label="value" :key="value"  v-show="isOpen2|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen2 && dataList[2].list.length>Max" @click="isOpen2 =!isOpen2" type="text">展开 </el-button>
										<el-button v-show="isOpen2 && dataList[2].list.length>Max" @click="isOpen2 =!isOpen2"  type="text">收起 </el-button>
									</template>							
								</li>
							<li >
								<!-- CPU -->
									{{dataList[3].title}}: 	
									<template class="filter">
										<span>高通: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.cpu" @change="singleChange3">
											<el-checkbox  v-for="(value,index) in dataList[3].dict.gt" :label="value" :key="value" v-show="isOpen3|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen3 && dataList[3].dict.gt.length>Max" @click="isOpen3 =!isOpen3" type="text">展开 </el-button>
										<el-button v-show="isOpen3 && dataList[3].dict.gt.length>Max" @click="isOpen3 =!isOpen3"  type="text">收起 </el-button>									
									</template>	
									<div></div>
									<template>
										<span style="margin-left:35px">麒麟: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.cpu" @change="singleChange3">
											<el-checkbox  v-for="(value,index) in dataList[3].dict.hw" :label="value" :key="value" v-show="isOpen31|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen31 && dataList[3].dict.hw.length>Max" @click="isOpen31 =!isOpen31" type="text">展开 </el-button>
										<el-button v-show="isOpen31 && dataList[3].dict.hw.length>Max" @click="isOpen31 =!isOpen31"  type="text">收起 </el-button>									
									</template>	
									<div></div>
									<template>
										<span style="margin-left:35px">苹果: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.cpu" @change="singleChange3">
											<el-checkbox  v-for="(value,index) in dataList[3].dict.pg" :label="value" :key="value" v-show="isOpen32|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen32 && dataList[3].dict.pg.length>Max" @click="isOpen32 =!isOpen32" type="text">展开 </el-button>
										<el-button v-show="isOpen32 && dataList[3].dict.pg.length>Max" @click="isOpen32 =!isOpen32"  type="text">收起 </el-button>									
									</template>	
									<div></div>
									<template>
										<span style="margin-left:35px">其他: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.cpu" @change="singleChange3">
											<el-checkbox  v-for="(value,index) in dataList[3].dict.qt" :label="value" :key="value" v-show="isOpen33|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen33 && dataList[3].dict.qt.length>Max" @click="isOpen33 =!isOpen33" type="text">展开 </el-button>
										<el-button v-show="isOpen33 && dataList[3].dict.qt.length>Max" @click="isOpen33 =!isOpen33"  type="text">收起 </el-button>									
									</template>																												

								</li>
								<!-- GPU -->
							<li >
									{{dataList[4].title}}:  
									<template>
										<span>Adreno: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.gpu" @change="singleChange4">
											<el-checkbox v-for="(value,index) in dataList[4].dict.gt" :label="value" :key="value"  v-show="isOpen4|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen4 && dataList[4].dict.gt.length>Max" @click="isOpen4 =!isOpen4" type="text">展开 </el-button>
										<el-button v-show="isOpen4 && dataList[4].dict.gt.length>Max" @click="isOpen4 =!isOpen4"  type="text">收起 </el-button>
									</template>		
									<div></div>
									<template>
										<span style="margin-left:35px">Mali: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.gpu" @change="singleChange4">
											<el-checkbox v-for="(value,index) in dataList[4].dict.arm" :label="value" :key="value"  v-show="isOpen41|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen41 && dataList[4].dict.arm.length>Max" @click="isOpen41 =!isOpen41" type="text">展开 </el-button>
										<el-button v-show="isOpen41 && dataList[4].dict.arm.length>Max" @click="isOpen41 =!isOpen41"  type="text">收起 </el-button>
									</template>	
									<div></div>
									<template>
										<span style="margin-left:35px">ios: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.gpu" @change="singleChange4">
											<el-checkbox v-for="(value,index) in dataList[4].dict.pg" :label="value" :key="value"  v-show="isOpen42|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen42 && dataList[4].dict.pg.length>Max" @click="isOpen42 =!isOpen42" type="text">展开 </el-button>
										<el-button v-show="isOpen42 && dataList[4].dict.pg.length>Max" @click="isOpen42 =!isOpen42"  type="text">收起 </el-button>
									</template>	
									<div></div>
									<template>
										<span style="margin-left:35px">PowerVR: </span>
										<el-checkbox-group v-model="queryInfo.filter_list.gpu" @change="singleChange4">
											<el-checkbox v-for="(value,index) in dataList[4].dict.img" :label="value" :key="value"  v-show="isOpen43|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen43 && dataList[4].dict.img.length>Max" @click="isOpen43 =!isOpen43" type="text">展开 </el-button>
										<el-button v-show="isOpen43 && dataList[4].dict.img.length>Max" @click="isOpen43 =!isOpen43"  type="text">收起 </el-button>
									</template>																																	
								</li>
							<li >
									{{dataList[5].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll5" @change="allchannge5" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.ram" @change="singleChange5">
											<el-checkbox v-for="(value,index) in dataList[5].list" :label="value" :key="value"  v-show="isOpen5|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen5 && dataList[5].list.length>Max" @click="isOpen5 =!isOpen5" type="text">展开 </el-button>
										<el-button v-show="isOpen5 && dataList[5].list.length>Max" @click="isOpen5 =!isOpen5"  type="text">收起 </el-button>
									</template>							
								</li>
							<li >
									{{dataList[6].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll6" @change="allchannge6" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.screen" @change="singleChange6">
											<el-checkbox v-for="(value,index) in dataList[6].list" :label="value" :key="value"  v-show="isOpen6|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen6 && dataList[6].list.length>Max" @click="isOpen6 =!isOpen6" type="text">展开 </el-button>
										<el-button v-show="isOpen6 && dataList[6].list.length>Max" @click="isOpen6 =!isOpen6"  type="text">收起 </el-button>
									</template>							
								</li>
							<li >
									{{dataList[7].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll7" @change="allchannge7" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.resolution" @change="singleChange7">
											<el-checkbox v-for="(value,index) in dataList[7].list" :label="value" :key="value"  v-show="isOpen7|| index < Max">{{value}}</el-checkbox>
										</el-checkbox-group>
										<el-button v-show="!isOpen7 && dataList[7].list.length>Max" @click="isOpen7 =!isOpen7" type="text">展开 </el-button>
										<el-button v-show="isOpen7 && dataList[7].list.length>Max" @click="isOpen7 =!isOpen7"  type="text">收起 </el-button>
									</template>							
								</li>
							<li >
									{{dataList[8].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll8" @change="allchannge8" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.state" @change="singleChange8">
											<el-checkbox v-for="value in dataList[8].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>	
							<li >
									{{dataList[9].title}}:  
									<template>
									<!-- <el-checkbox :id=i indeterminate="isIndeterminate" v-model="checkAll" @change="channge1(i)" :checked='test11' a='tttt'>全选</el-checkbox> -->
									<!-- <el-checkbox id="i" :v-model="checkAll8" @change="allchannge8" >全选</el-checkbox> -->
										<el-checkbox-group v-model="queryInfo.filter_list.position" @change="singleChange9">
											<el-checkbox v-for="value in dataList[9].list" :label="value" :key="value">{{value}}</el-checkbox>
										</el-checkbox-group>
									</template>							
								</li>																																																					
							</ul>
						</section>
						<div></div>
						<el-button type="warning"  @click="rest" size="mini" style="margin-left:25px;margin-top:0px" >重置</el-button>
					</div>
				</el-collapse-item>
			</el-collapse>	

			<!-- 设备列表区 -->
			<el-table :data="DevicesList" style="width: 100%"  @sort-change="sortEvent" border stripe>
				<!-- 索引列 -->
				<el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
				<!-- <el-table-column prop="mobile" label="测试" sortable align="center"></el-table-column>                -->
				<el-table-column prop="title" label="设备编号" sortable="custom" align="center" v-if="show"></el-table-column>
				<el-table-column prop="brand" label="品牌" sortable="custom" align="center" ></el-table-column>
				<el-table-column prop="name" label="设备名" sortable="custom" align="center"></el-table-column>
				<el-table-column prop="udid" label="udid" sortable="custom" align="center" v-if="show" ></el-table-column>
				<el-table-column prop="resolution" label="分辨率" sortable="custom" align="center" ></el-table-column>
				<el-table-column prop="screen" label="屏幕类型" sortable="custom" align="center"></el-table-column>
				<el-table-column prop="system" label="系统" sortable="custom" align="center"></el-table-column>
				<el-table-column prop="cpu" label="CPU" sortable="custom" align="center"></el-table-column>
				<el-table-column prop="gpu" label="GPU" sortable="custom" align="center" v-if="show1"></el-table-column>
				<el-table-column prop="ram" label="内存" sortable="custom" align="center"></el-table-column>
				<el-table-column prop="platform" label="平台" sortable="custom" align="center" v-if="show"></el-table-column>
				<el-table-column  prop="state" label="状态" sortable="custom" align="center">
					<template slot-scope="scope">
						<el-tag type="sucess" round v-if="scope.row.state==='在库'" effect="plain">在库</el-tag>
						<el-tag type="info" round v-if="scope.row.state==='借出'"  effect="plain">借出</el-tag>
						<el-tag type="warning" round v-if="scope.row.state==='审批中'" effect="plain">审批中</el-tag>
						<el-tag type="danger" round v-if="scope.row.state==='锁定中'" effect="plain">锁定中</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" sortable="custom"  label="保管人"  align="center"></el-table-column>
				<el-table-column label="申请借用"  width="125" align="center">
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
				:page-sizes="[10, 30, 90, 180]"
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
					<el-input v-model="supplyform.email" disabled></el-input>
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
				<el-button type="primary" @click="Supply" :disabled = "isDisabled">确 定</el-button>
			</div>
			<!-- 紧急借用申请弹窗 -->
		</el-dialog>
		<el-dialog title="紧急申请信息" :visible.sync="AddSupplyDialog2">
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
/*
    const DeviceType = [
               { 
                title:"品牌",
                list:["苹果","小米","华为","三星","OPPO","vivo","魅族","一加",]
                },
               { 
                title:"android系统",
                list:["Android10","Android9","Android8","Android7","Android6","Android5","Android4",]
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
				list:["1280x720","1334x750","1920x1080","2160x1080","2244x1080","2280x1080","2340x1080","2560x1440","2960x1440","3120x1440","1280x720","1334x750","1920x1080","2160x1080","2244x1080","2280x1080","2340x1080","2560x1440","2960x1440","3120x1440"]
                },				
               { 
                title:"状态",
                list:["在库","借出","审批中","锁定中"]
                },				
			];
*/

export default {
	inject:['reload'],
    // 接口获取后台设备列表
	data() {
		//申请表单中验证日期的校验规则
		// var checkdate = (rule, value, callback) => {
		//     if (!value) {
		//     return callback(new Error('日期不能为空'))
		// }};
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
					"position":[],
					"sortData":{
						"prop":'',
						"order":'',
					}
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
            dataList:null,
			show :false,
			show1:false,
			show2:false,
			show3:false,
			activenames:['1'],
			// 按钮是否可点击
			isDisabled:false,
			//筛选标签显示数
			Max:8,
			isOpen :false,
			isOpen1 :false,
			isOpen2 :false,
			isOpen3 :false,
			isOpen31 :false,
			isOpen32 :false,
			isOpen33 :false,
			isOpen4 :false,
			isOpen41 :false,
			isOpen42 :false,
			isOpen43 :false,		
			isOpen5 :false,
			isOpen6 :false,
			isOpen7 :false,
        };
	},
	created() {
		//获取设备列表
		this.getDevicesList();
		// 处理设备筛选数据
		this.getFilter();
	},
	methods: {
		sortEvent(a){
			if(a.order==null){
				a.prop = null
			}else if(a.order=="ascending"){
				a.order = true
			}else if(a.order=="descending"){
				a.order = false
			}
			this.queryInfo.filter_list.sortData.prop=a.prop;
			this.queryInfo.filter_list.sortData.order=a.order;
			this.getDevicesList();
		},
		// 请求后台参数,并获取设备列表
		async getDevicesList() {
			// 获取设备信息、每条显示数、每页显示数
			const { data: res } = await this.$http.get("equip_list", {
				params: this.queryInfo
			});
			console.log(res)
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
		// 显示申请栏，并获取到设备id，用户邮箱
		showSupplyDilog1(DeviceId) {
			this.AddSupplyDialog1 = true;
			this.supplyform.rtime = '';
			this.supplyform.reason = '';
			this.supplyform.deviceid = DeviceId;
			this.supplyform.email = this.$cookies.get("email")
			// this.supplyform.email = window.sessionStorage.getItem("email");
		},
		// 显示紧急申请栏，并获取到设备id，用户邮箱
		showSupplyDilog2(DeviceId) {
			this.supplyform.rtime = '';
			this.AddSupplyDialog2 = true;
			// console.log(DevicesId)
			this.supplyform.deviceid = DeviceId;
			this.supplyform.email = this.$cookies.get("email")
			// this.supplyform.email = window.sessionStorage.getItem("email");
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
		// 普通借用
		async Supply() {
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
			this.AddSupplyDialog1 = false;
			// 刷新设备列表
			this.getDevicesList();
			//提示提交申请成功
			this.$message.success("提交成功");
		},

		// 紧急借用
		async mergeSupply() {
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
			this.getDevicesList();
			//提示提交申请成功
			this.$message.success("提交成功");
		},
		//搜索事件
		Search() {
			// console.log(this.queryInfo.query)
			this.queryInfo.pagenum = 1
			this.getDevicesList();
		},
		//显示所有信息
		showAllinfo(){
			this.show = !this.show
			this.show1 = !this.show1
			this.CreatSort()
		},
	//筛选方法
		singleChange0(value) {
			if(this.queryInfo.filter_list.brand.length==0){
				this.getDevicesList()
				return this.show2 = this.show3 =false

			}
			if(this.queryInfo.filter_list.brand == "苹果"){
				this.show2 = true
				}else{
					this.show2 = false
				}
			if(this.queryInfo.filter_list.brand.length!=0){
				if(this.queryInfo.filter_list.brand.indexOf("苹果") == -1 ){
					this.show3 =true
				}else{
					this.show3 = false
				}
			}
			this.queryInfo.pagenum=1		
			this.getDevicesList();
		},
		//#region  折叠
		singleChange1(value) {
			this.queryInfo.filter_list.system = this.android.concat(this.ios)
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		singleChange2(value) {
			this.queryInfo.filter_list.system = this.android.concat(this.ios)
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},				  
		singleChange3(value) {
			// let checkedCount = value.length;
			// this.checkAll3 = checkedCount === this.dataList[3].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		singleChange4(value) {
			// let checkedCount = value.length;
			// this.checkAll4 = checkedCount === this.dataList[4].list.length;
			this.queryInfo.pagenum=1
			this.show1 = true
			this.getDevicesList();			
		},
		singleChange5(value) {
			// let checkedCount = value.length;
			// this.checkAll5 = checkedCount === this.dataList[5].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		singleChange6(value) {
			// let checkedCount = value.length;
			// this.checkAll6 = checkedCount === this.dataList[6].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},

		singleChange7(value) {
			// let checkedCount = value.length;
			// this.checkAll7 = checkedCount === this.dataList[7].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		// allchannge8(val) {
		// 	this.queryInfo.filter_list.state = val ? this.dataList[8].list : [];
		// 	this.queryInfo.pagenum=1
		// 	this.getDevicesList();			
		// },
		singleChange8(value) {
			// let checkedCount = value.length;
			// this.checkAll8 = checkedCount === this.dataList[8].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		singleChange9(value) {
			// let checkedCount = value.length;
			// this.checkAll8 = checkedCount === this.dataList[9].list.length;
			this.queryInfo.pagenum=1
			this.getDevicesList();			
		},
		//#endregion  

		// 重置筛选(刷新页面)
		rest(){
				  this.reload()
				//   this.getFilter()
		},
		// 获取筛选类列表
		async getFilter(){
			const{data:res} = await this.$http.get("get_fl_list");
			var data= [];
			data = res.data.dict.DeviceType;
			// console.log(data[1])
			data[1].list = this.CreatSort(data[1].list)
			data[2].list = this.CreatSort(data[2].list)
			data[5].list = this.CreatSort(data[5].list)
			data[3].dict.pg = this.CreatSort(data[3].dict.pg)
			this.dataList = data;
			// console.log(this.dataList)
			if(res.meta.status !==200){
				return this.$message.error(res.meta.msg)
			}
		},
		// 对筛选数据进行排序
		paixu(){
			this.DevicesList = this.DevicesList1;
		},
		// 排序方法
		CreatSort(arr1){
			var arr2=[]
			for(var i=0;i<arr1.length;i++){
				var m ;
				m = arr1[i].replace(/[^\d]/g,"")
				arr2[i]=Number(m)
			}
			// console.log(arr2)
			for(var k=0;k<arr2.length-1;k++){	
				for(var j=0;j<arr2.length-1-k;j++){
					if(arr2[j]>= arr2[j+1]){					
					}else{
						var a;
						a = arr2[j];
						arr2[j] = arr2[j+1]
						arr2[j+1] = a
						var b;
						b =arr1[j];
						arr1[j]=arr1[j+1];
						arr1[j+1]=b;
					}
				}
			}
			return arr1 
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
.el-checkbox{
	display:inline-block
}
#i{
	margin-right: 20px
}
#choice {
    width: 100%;
	height: auto;
	padding-top:0px ;
	margin-top: 0px;
	// background: url(img/bg.jpg) no-repeat 0 0;
	display:inline-block
}
#section {
    width: 100%px;
    height: auto;
	margin-bottom: 0px;
	padding-top:0px ;
	display:inline-block
}
#type {
    width: 100%;
    height: auto;
    // background: url(img/type_bg.png) no-repeat 0 0;
    padding: 17px 0 16px 28px;
	margin-top: 0 ;
	display:inline-block
	
}
#type li {
    height: auto;
    color: #8a8a8a;
	line-height: 35px;
	list-style-type:none

}
#filter{
	padding-left: 50px;
}

.active {
    background:   #00ff00
}

</style>>