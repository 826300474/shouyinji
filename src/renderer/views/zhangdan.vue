<template>
  <div id="zhangdan">
    <div class="left_box"> 
      <li v-for="(item,index) in order_data" @click="go_con(item.order_id,index)" v-bind:class="{ active: index==active_index}" :key="index">
        <div>{{item.order_id}}</div>
        <div><h1>{{item.create_time}}</h1><h2>{{item.order_money}}</h2></div>
      </li>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </div>
    <div class="right_box">
      <el-table
        :data="con_data"
        border
        height="500"
        style="width: 100%">
        <el-table-column
          prop="item_name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="item_money"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="item_num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="item_heji"
          label="合计">
        </el-table-column>
      </el-table>  
      <div class="box">
        <div>
          <h1>收银员：{{order_con.waiter_no}}</h1>
          <h1>会员：</h1>
        </div>
        <div>
          <h2>总价：{{order_con.order_money}}</h2>
        </div>
      </div>
      <div>
        <el-button>小票打印</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zhangdan",
  data() {
    return {
      page: 1,
      order_data: "",
      con_data: "",
      order_con: "",
      active_index: 0
    };
  },
  created() {
    var xinxi = {
      id: 5,
      type: 1,
      page: this.page,
      mer_no: this.$locs.get("mer_no"),
      shop_no: this.$locs.get("shop_no"),
      waiter_no: this.$locs.get("waiter_no"),
      login_key: this.$locs.get("login_key")
    };
    var commerhttp = this.$comjs.gethttp();
    this.$api.post(commerhttp, xinxi).then(res => {
      if (res["state"] == 51) {
        this.page++;
        this.order_data = res["data"]["order"];
        this.go_con(res["data"]["order"][0]["order_id"], 0);
      }
    });
  },
  methods: {
    loadMore: function() {
      var xinxi = {
        id: 5,
        type: 1,
        page: this.page,
        mer_no: this.$locs.get("mer_no"),
        shop_no: this.$locs.get("shop_no"),
        waiter_no: this.$locs.get("waiter_no"),
        login_key: this.$locs.get("login_key")
      };
      var commerhttp = this.$comjs.gethttp();
      this.$api.post(commerhttp, xinxi).then(res => {
        if (res["state"] == 51) {
          this.page++;
          this.order_data  = this.order_data.concat(res["data"]["order"]); 
        }
      });
    },
    go_con: function(id, index) {
      this.active_index = index;
      var xinxi = {
        id: 5,
        type: 2,
        order_id: id,
        mer_no: this.$locs.get("mer_no"),
        shop_no: this.$locs.get("shop_no"),
        waiter_no: this.$locs.get("waiter_no"),
        login_key: this.$locs.get("login_key")
      };
      var commerhttp = this.$comjs.gethttp();
      this.$api.post(commerhttp, xinxi).then(res => {
        if (res["state"] == 51) {
          res["data"]["order"]["order_item"].forEach(element => {
            element.item_heji = element.item_num * element.item_money;
          });
          this.con_data = res["data"]["order"]["order_item"];
          this.order_con = res["data"]["order"];
        }
      });
    }
  }
};
</script>
<style>
#zhangdan {
  padding-top: 66px;
}
.left_box {
  position: fixed;
  top: 66px;
  left: 0;
  bottom: 0;
  width: 400px;
  background: #fff;
  overflow-y: auto;
}
.left_box li {
  padding: 10px;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;
}
.left_box li.active {
  background: #f2f2f2;
}
.left_box li div:last-child {
  display: flex;
  justify-content: space-between;
}
.left_box h1 {
  line-height: 30px;
}
.left_box h2 {
  color: red;
  line-height: 30px;
  font-size: 16px;
}
.right_box {
  position: fixed;
  top: 66px;
  left: 400px;
  bottom: 0;
  right: 0;
  padding: 10px;
  background: #fff;
}
.right_box .box {
  background: #fff;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #f2f2f2;
  margin-bottom: 10px;
}
.right_box .box h1 {
  line-height: 20px;
}
.right_box .box h2 {
  line-height: 40px;
  font-size: 20px;
  color: red;
}
.right_box button {
  float: right;
}
</style>

