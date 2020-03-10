<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新增设备</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
                <el-button type="primary"  @click="submitForm">提交</el-button>
                <el-button type="primary"  @click="rest">重置</el-button>
            </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      AddNewDevices: {
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
      isRouterAlive:true
    };
  },
  created() {
  },
  methods: {
    // 后台获取个人借用信息
    async submitForm() {
      const { data: res } = await this.$http.get("equip_add", {
        params: this.AddNewDevices
      });
			if (res.meta.status !== 200) {
				if(res.meta.status == 401){
          this.$message.error("你还不是管理员");
					return this.$router.push('./login')
				}
				return this.$message.error(res.meta.msg);
			}
      // 后台获取的借用列表到前台
      this.$message.success("新增设备成功");
    },
    rest(){
      this.reload()
    }
  }
};
</script>