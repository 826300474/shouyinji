<template>
  <div id="search">
      <el-dialog title="商品搜索" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <el-input placeholder="输入商品关键字" prefix-icon="el-icon-search" v-model="text" @keyup.enter.native="gosearch">
          <div slot="append" @click="gosearch">搜索</div>
        </el-input>  
        <el-table
          :data="secrch_data"
          height="313"
          border
          style="width: 100%">
          <el-table-column
            prop="item_name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="item_no"
            label="编码">
          </el-table-column>
          <el-table-column
            prop="item_money"
            label="价格">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="add_item(scope.$index)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>   
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      text: "",
      item_data: "", 
      secrch_data:[],
    };
  },
  mounted() {
    var _this = this;
    this.$bus.$on("search_show", res => {
      _this.dialogVisible = true;
      _this.text = res.text;
      _this.item_data = res.item_data;
      _this.gosearch();
    });
  },
  methods: {
    add_item:function(text){
      this.$bus.$emit('get_item',this.secrch_data[text]); 
    },
    handleClose: function() {
      this.dialogVisible = false;
    },
    gosearch: function() {
      var _this = this;
      _this.secrch_data = [];
      var text = this.text; 
      var data = this.item_data;
      data.forEach(element => {
        if(String(element['item_name']).indexOf(text)!=-1){
          _this.secrch_data.push(element);   
        }
      });
    }
  }
};
</script>
<style>
#search .el-input{
  margin-bottom: 20px;
}
#search .el-input-group__append{
  cursor: pointer;
}
</style>