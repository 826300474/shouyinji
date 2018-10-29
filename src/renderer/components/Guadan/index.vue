<template>
  <div id="guadan">
      <el-dialog title="挂单" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="50px" size="medium">
          <el-form-item label="牌号">
            <el-input v-model="form.paihao"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.beizhu"></el-input>
          </el-form-item>  
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
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
      shop_data:'',
    };
  },
  mounted() {
    var _this = this;
    this.$bus.$on("guadan_show", res => {
      _this.dialogVisible = true;
      _this.shop_data = res;
    });
  },
  methods: {
    onSubmit: function() {
      var data = {
        paihao:this.form.paihao,
        beizhu:this.form.beizhu,
        shop_data:this.shop_data,  
      }
      this.$store.dispatch("SET_GUADAN", data);
      this.$bus.$emit('guadan_ok');   
      this.handleClose();
    },
    handleClose: function() {
      this.form.paihao = "";
      this.form.beizhu = "";
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