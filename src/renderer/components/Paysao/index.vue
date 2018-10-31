<template>
	<div id="saoma">
         <el-dialog title="扫码收款" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
          <el-form>
            <el-form-item label="编码">
              <el-input v-model="bianma" disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <img :src="img_src" alt="">
          <div class="saoma_titie">{{img_text}}</div>
        </el-dialog>   
    </div>	
</template>
<script>
import saoma from "../../assets/image/saoma.png";
export default {
  data() {
    return {
      dialogVisible: false,
      shoukuan: "",
      order_id: "",
      bianma: "",
      img_src: saoma,
      img_text: "扫码中，请耐心等待..."
    };
  },
  created() {},
  mounted() {
    this.$bus.$on("saoma", res => {
      this.dialogVisible = true;
      this.shoukuan = res.heji_money;
      this.order_id = res.order_id;
      var code = "";
      var lastTime, nextTime;
      var lastCode, nextCode;
      document.onkeypress = function(e) {
        nextCode = e.which;
        nextTime = new Date().getTime();
        if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
          code += String.fromCharCode(lastCode);
        } else if (
          lastCode != null &&
          lastTime != null &&
          nextTime - lastTime > 100
        ) {
          code = "";
        }
        lastCode = nextCode;
        lastTime = nextTime;
        if (e.which == 13 && code) {
          this.bianma = code;
          return;
          var url =
            this.$comjs.commerImg +
            "index.php/Home/Api/Qrcode/DFqrcode?mer_no=" +
            this.$locs.get("mer_no") +
            "&order_id=" +
            res.order_id +
            "&paymoney=" +
            res.heji_money +
            "&paycode=" +
            code +
            "&from=DAPP&equipId=''&storeNo=" +
            this.$locs.get("waiter_no");
          this.$api.post(url).then(res => {
            if (res["state"] == "success") {
            }
          });
        }
      };
    });
  },
  methods: {
    handleClose: function() {
      this.shishou = 0;
      this.dialogVisible = false;
    },
    jiezhang: function() {
      this.form.shishou = 0;
      this.form.zhaoling = 0;
      this.dialogVisible = false;
      this.$message({
        message: "恭喜你，收款成功",
        type: "success"
      });
    }
  }
};
</script>
<style>
#saoma img {
  display: block;
  width: 30%;
  margin: 50px auto;
}
#saoma .saoma_titie {
  text-align: center;
  font-size: 26px;
  padding-bottom: 20px;
}
#saoma .el-input__inner {
  height: 60px !important;
  font-size: 20px !important;
  font-weight: bold !important;
}
</style>