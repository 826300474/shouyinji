<template>
  <div id="addgoods">
      <el-dialog title="商品资料" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <div class="clearfix">
          <div class="big_box">
            <p>条码：</p>
            <el-input
              placeholder=""
              v-model="form.tiaoma">
            </el-input>
            <h1 @click="made_ma">生成</h1>
          </div>
          <div class="small_box">
            <p>销售价：</p>
            <el-input
              placeholder=""
              v-model="form.xiaoshoujia">
            </el-input>
          </div>
          <div class="big_box">
            <p>品名：</p>
            <el-input
              placeholder=""
              v-model="form.pinming">
            </el-input>
          </div>
          <div class="small_box">
            <p>进货价：</p>
            <el-input
              placeholder=""
              v-model="form.jinhuojia">
            </el-input>
          </div>
          <div class="big_box">
            <p>分类：</p>
            <el-select
              placeholder=""
              v-model="form.select">
              <el-option :label="item.class_name" :value="item.class_name" v-for="(item,index) in fenlei" :key="index"></el-option>
            </el-select>
          </div>
          <div class="small_box">
            <p>库存：</p>
            <el-input
              placeholder=""
              v-model="form.kucun">
            </el-input>
          </div>
        </div>
        <div class="btn_box clearfix">
          <el-button type="primary">立即创建</el-button>
          <el-button @click="handleClose">取消</el-button>
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
        tiaoma:'',
        xiaoshoujia:'',
        pinming:'',
        jinhuojia:'',
        fenlei:'',
        kucun:'',
        select:'',
      },
      fenlei:'',
    };
  },
  mounted() {
    this.$bus.$on("addgoods", res => {
      this.dialogVisible = true;
      this.fenlei = res;
    });
  },
  methods: {
    made_ma:function(){
      this.form.tiaoma = '123';
    },
    handleClose: function() {
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
  }
};
</script>
<style>
#addgoods .btn_box{
  margin-top: 20px;
  padding-top: 20px;
  border-top: solid 1px #f2f2f2;
}
#addgoods .btn_box button{
  float: right;
  margin-left: 10px;
}
#addgoods .big_box {
  width: 50%;
  margin-right: 10%;
  float: left;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
}
#addgoods .big_box h1{
  position: absolute;
  right: 2px;
  top: 1px;
  padding: 0 15px;
  line-height: 38px;
  cursor: pointer;
  color: #909399;
  background-color: #f5f7fa;
  /* border: 1px solid #dcdfe6; */
  border-radius:0 4px 4px 0;
}
#addgoods .big_box input{
  width: 300px;
}
#addgoods .small_box {
  width: 40%;
  float: left;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
#addgoods p{
  font-size: 16px;
  width: 100px;
  line-height: 40px;
}
</style>