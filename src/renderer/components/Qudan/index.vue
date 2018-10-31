<template>
  <div id="qudan">
      <el-dialog title="取单" :visible.sync="dialogVisible" width="1000px" :before-close="handleClose">
        <div class="btn_box clearfix">
          <span v-bind:class="{ active: index == del_index }" plain="true" v-for="(item,index) in all_data" :key="index" @click="chang_item(index)">{{JSON.parse(item)['paihao']}}</span>
        </div>
        <el-table
          :data="shop_data"
          height="288"
          border
          style="width: 100%">
          <el-table-column
            prop="item_no"
            label="编码">
          </el-table-column>
          <el-table-column
            prop="item_name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="active_num"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="item_money"
            label="价格">
          </el-table-column>
        </el-table>
        <p>备注：{{beizhu_data}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="delete_item">删 除</el-button>
          <el-button type="primary" @click="onSubmit">取 单</el-button>
        </span>
      </el-dialog>  
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      all_data: this.$store.state.guadan.guadan_data,
      shop_data: [],
      del_index: 0,
      beizhu_data: ""
    };
  },
  mounted() {
    var _this = this;
    this.$bus.$on("qudan_show", res => {
      _this.dialogVisible = true;
      this.chang_item(0);
    });
  },
  methods: {
    chang_item: function(index) {
      this.del_index = index;
      var all_data = JSON.parse(this.$store.state.guadan.guadan_data[index])[
        "shop_data"
      ];
      for (let i = 0; i < all_data.length; i++) {
        if (all_data[i]["active_num"] >0 ) {
          this.shop_data.push(all_data[i]);  
        }
      }
      this.beizhu_data = JSON.parse(
        this.$store.state.guadan.guadan_data[index]
      )["beizhu"];
    },
    delete_item: function() {
      this.$confirm("您是否要删除此条挂单")
        .then(_ => {
          this.$store.dispatch("DEL_GUADAN", this.del_index);
          if (this.$store.state.guadan.guadan_data.length > 0) {
            this.chang_item(0);
          } else {
            this.shop_data = [];
            this.beizhu_data = '';
          }
          done();
        })
        .catch(_ => {});
    },
    onSubmit: function() {
      this.$bus.$emit("qudan_ok", JSON.parse(this.$store.state.guadan.guadan_data[this.del_index])[
        "shop_data"
      ]);
      this.dialogVisible = false;
    },
    handleClose: function() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style>
#qudan .btn_box {
  margin-bottom: 15px;
}
#qudan p {
  margin-top: 10px;
}
#qudan .btn_box span {
  padding: 10px;
  display: block;
  float: left;
  border: solid 1px #ebeef5;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 4px;
}
#qudan .btn_box span.active {
  border: solid 1px #66b1ff;
}
</style>