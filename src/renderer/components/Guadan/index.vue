<template>
  <div id="guadan">
      <el-dialog title="挂单" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="60px" size="medium" :rules="rules">
          <el-form-item label="牌号" prop="paihao">
            <el-input v-model="form.paihao"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.beizhu"></el-input>
          </el-form-item> 
          <el-form-item>
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </el-form-item> 
        </el-form>
      </el-dialog>   
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        paihao: "",
        beizhu: ""
      },
      shop_data: "",
      rules: {
        paihao: [{ required: true, message: "请填写挂单牌号", trigger: "change" }]
      }
    };
  },
  mounted() {
    var _this = this;
    this.$bus.$on("guadan_show", res => {
      _this.dialogVisible = true;
      _this.shop_data = res;
    });
    document.onkeyup = function (e) {
        if(e.key == 'Enter'){
          _this.onSubmit();
        }
    }
  },
  methods: {
    onSubmit: function(form) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          var data = {
            paihao: this.form.paihao,
            beizhu: this.form.beizhu,
            shop_data: this.shop_data
          };
          this.$store.dispatch("SET_GUADAN", data);
          this.$bus.$emit("guadan_ok");
          this.handleClose();
        } else {
          return false;
        }
      });
    },
    handleClose: function() {
      this.form.paihao = "";
      this.form.beizhu = "";
      this.$refs['form'].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>
<style>
#search .el-form-item_content button {
  float: right;
}
</style>