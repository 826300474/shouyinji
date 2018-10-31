<template>
	<div id="xianjin">
		<el-dialog title="现金收款" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
	  <el-form :model="form">
	    <el-form-item label="收款金额">
	      <el-input v-model="form.shoukuan" disabled="disabled"></el-input>
	    </el-form-item>
		  <el-form-item label="实收金额">
	      <el-input v-model="form.shishou"></el-input>
	    </el-form-item>
	    <el-form-item label="找零">
	      <el-input v-model="form.zhaoling" disabled="disabled"></el-input>
	    </el-form-item>
	  </el-form>
	  <div class="jianpan clearfix">
	  	<li>
	  		<span>7</span>
	  		<span>4</span>
	  		<span>1</span>
	  	</li>
	  	<li>
	  		<span>8</span>
	  		<span>5</span>
	  		<span>2</span>
	  	</li>
	  	<li>
	  		<span>9</span>
	  		<span>6</span>
	  		<span>3</span>
	  	</li>
	  	<li>
	  		<span>0</span>
	  		<span>100</span>
	  		<span>200</span>
	  	</li>
	  	<li>
	  		<span>删除</span>
	  		<span class="jiezhang" @click='jiezhang'>结账（Enter）</span>
	  	</li>
	  </div>
	</el-dialog>
	</div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        shoukuan: 0,
        shishou: "",
        zhaoling: 0
      },
      order_id: "",
      focus_btn: true
    };
  },
  mounted() {
    this.$bus.$on("xianjinpay", res => {
      this.dialogVisible = true;
      this.form.shoukuan = res.heji_money;
      this.order_id = res.order_id;
    });
  },
  methods: {
    handleClose: function() {
      this.form.shishou = "";
      this.form.zhaoling = 0;
      this.dialogVisible = false;
    },
    jiezhang: function() {
      var xinxi = {
        id: 5,
        type: 5,
        order_id: this.order_id,
        mer_no: this.$locs.get("mer_no"), //商户编号
        shop_no: this.$locs.get("shop_no"), //分店编号
        login_key: this.$locs.get("login_key")
      };
      var commerhttp = this.$comjs.gethttp();
      this.$api.post(commerhttp, xinxi).then(res => {
        if (res["state"] == 51) {
          this.$bus.$emit("pay_success");
          this.form.shishou = 0;
          this.form.zhaoling = 0;
          this.dialogVisible = false;
          this.$message({
            message: res["Msg"],
            type: "success"
          });
        } else {
          this.$message.error(res["Msg"]);
        }
      });
    }
  },
  watch: {
    form: {
      handler(val, oldVal) {
        if (this.form.shishou > 0 && this.form.shoukuan > 0) {
          this.form.zhaoling = (this.form.shishou - this.form.shoukuan).toFixed(
            2
          );
        }
      },
      deep: true
    }
  }
};
</script>
<style>
#xianjin .jianpan {
  margin-top: 20px;
}
#xianjin .jianpan li {
  float: left;
  width: 144px;
  text-align: center;
  margin-right: 10px;
}
#xianjin .jianpan li:last-child {
  margin-right: 0;
}
#xianjin .jianpan span {
  display: block;
  background-color: #e5e5e5;
  margin-bottom: 10px;
  height: 86px;
  line-height: 80px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 4px;
}
#xianjin .jianpan span:active {
  background-color: #d9d9d9;
}
#xianjin .jiezhang {
  height: 182px !important;
  line-height: 182px !important;
  background-color: red !important;
  color: #fff !important;
}
#xianjin .el-form {
  display: flex;
  justify-content: space-between;
}
#xianjin .el-form-item {
  width: 30%;
  margin: 0;
  text-align: center;
}
#xianjin .el-input__inner {
  height: 80px !important;
  font-size: 22px !important;
  font-weight: bold !important;
}
#xianjin .el-form-item:nth-of-type(2) .el-input__inner {
  color: green;
}
#xianjin .el-form-item:last-child .el-input__inner {
  color: red;
}
#xianjin label {
  font-size: 18px;
  float: none;
  padding: 0;
  padding-bottom: 20px;
}
</style>