<template>
    <div id="shop">
        <div class="left">
            <li class="clearfix">
                <span>商品名称</span>
                <span>数量</span>
                <span>单价</span>
                <span>金额</span>
                <span></span>
            </li>
            <li v-for="(item,index) in shop_data" class='clearfix' :key="item.item_no">
                <span>{{item.item_name}}</span>
                <span><i v-on:click="item.active_num>1?item.active_numactive_num-=1:item.active_numactive_num">-</i><a>{{item.active_num}}</a><i v-on:click="item.active_num+=1">+</i></span>
                <span>{{item.item_money}}</span>
                <span>{{item.item_money*item.active_num | keeptwonum}}</span>
                <span><i class="el-icon-delete" v-on:click="remove(index)"></i></span>
            </li>
            <div class="btn_box">
                <div v-if="this.shop_data.length==0">
                  <button style="width:100%;">取单（{{guadan_data.length}}）</button>
                </div>
                <div v-if="this.shop_data.length>0">
                  <button v-on:click="clear" style="width:50%;">清空</button>
                  <button style="width:50%;" @click="guadan">挂单</button>
                </div>
            </div>
        </div>
        <div class="right">
            <nav>
                <a @click="go_nav('all')" v-bind:class="{ active: show_all }">全部</a>
                <a v-for="(item,index) in nav_data" @click="go_nav(index)" v-bind:class="{ active: item.isActive }" :key="item.class_name">{{item.class_name}}</a>
            </nav>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(item,index) in item_data" v-show="item.show_state" :key="index">
                <div class="grid-content bg-purple clearfix" v-on:click="add_item(item)">
                    <span v-bind:style="{backgroundImage:'url('+ item.item_img + ')'}"><h1 v-if="item.active_num > 0">{{item.active_num}}</h1></span>
                    <div class="box">
                        <div class="name">{{item.item_name}}</div>
                        <div class="money">{{item.item_money}}</div>
                    </div>
                </div>
              </el-col>
            </el-row>
            <div class="btn_box">
              <el-input placeholder="输入商品关键字" prefix-icon="el-icon-search" v-model="search" @keyup.enter.native="gosearch">
                <div slot="append" @click="gosearch">搜索</div>
              </el-input>
              <el-button type="primary" @click="addgood" icon="el-icon-goods">添加商品</el-button>
            </div>
        </div>
        <footer>
          <div>
            <h1 class="heji">合计：{{heji_money}}</h1>
          </div>
          <div>
            <button v-on:click="jiezhang('xianjinpay')">现金收款</button>
            <button v-on:click="jiezhang('saoma')">扫码收款</button>
          </div>
        </footer>
    </div>
</template>
<script>
export default {
  created() {
    var xinxi = {
      id: 4,
      type: 1,
      mer_no: this.$locs.get("mer_no"),
      shop_no: this.$locs.get("shop_no"),
      login_key: this.$locs.get("login_key")
    };
    var commerhttp = this.$comjs.gethttp();
    this.$api.post(commerhttp, xinxi).then(res => {
      if (res["state"] == 41) {
        for (var i = res["data"]["itemArr"].length - 1; i >= 0; i--) {
          res["data"]["itemArr"][i]["active_num"] = 0;
          res["data"]["itemArr"][i]["show_state"] = true;
          res["data"]["itemArr"][i]["item_img"] =
            this.$comjs.commerImg + res["data"]["itemArr"][i]["item_img"];
        }
        for (var i = res["data"]["classArr"].length - 1; i >= 0; i--) {
          res["data"]["classArr"][i]["isActive"] = false;
        }
        this.item_data = res["data"]["itemArr"];
        this.nav_data = res["data"]["classArr"];
      }
    });
  },
  data() {
    return {
      heji_money: 0,
      shop_data: [],
      item_data: "",
      nav_data: "",
      show_all: true,
      search:'',
      guadan_data:this.$store.state.guadan.guadan_data,
    };
  },
  mounted() {
    this.$bus.$on("pay_success", res => {
      this.shop_data = [];
      for (let index = 0; index < this.item_data.length; index++) {
        this.item_data[index]["active_num"] = 0;
      }
    });
    this.$bus.$on("get_item", res => {
      this.add_item(res);
    });
    this.$bus.$on("guadan_ok", res => {
      this.clear();
    });
  },
  methods: {
    guadan:function(){
      this.$bus.$emit('guadan_show',this.shop_data);   
    },
    gosearch:function(){
      if(!this.search){
        this.$message({
          message: '请先输入关键词',
          type: 'warning'
        });
        return;
      }
      var data = {
        text:this.search,
        item_data:this.item_data
      }
      this.$bus.$emit('search_show',data); 		  
    },
    addgood:function(){
			this.$bus.$emit('addgoods',this.nav_data); 		
		},
    go_nav: function(index) {
      for (let i = 0; i < this.nav_data.length; i++) {
        this.nav_data[i]["isActive"] = false;
      }
      if (index == "all") {
        for (var i = this.item_data.length - 1; i >= 0; i--) {
          this.item_data[i]["show_state"] = true;
        }
        this.show_all = true;
        return;
      }
      this.show_all = false;
      var id = this.nav_data[index]["class_no"];
      for (var i = this.item_data.length - 1; i >= 0; i--) {
        if (this.item_data[i]["class_no"] == id) {
          this.item_data[i]["show_state"] = true;
        } else {
          this.item_data[i]["show_state"] = false;
        }
      }
      this.nav_data[index]["isActive"] = true;
    },
    remove: function(event) {
      for (var i = this.item_data.length - 1; i >= 0; i--) {
        if (
          this.item_data[i]["class_no"] == this.shop_data[event]["class_no"]
        ) {
          this.item_data[i]["active_num"] = 0;
        }
      }
      this.shop_data.splice(event, 1);
    },
    clear: function() {
      this.shop_data = [];
      for (var i = this.item_data.length - 1; i >= 0; i--) {
        this.item_data[i]["active_num"] = 0;
      }
    },
    add_item: function(data) {
      var shop_data = this.shop_data;
      if (shop_data.length > 0) {
        for (var i = shop_data.length - 1; i >= 0; i--) {
          if (shop_data[i]["class_no"] == data["class_no"]) {
            shop_data[i]["active_num"]++;
            return;
          }
        }
        data["active_num"]++;
        this.shop_data.push(data);
      } else {
        data["active_num"]++;
        this.shop_data.push(data);
      }
    },
    jiezhang: function(type) {
      if (this.shop_data.length == 0) {
        this.$alert("请先选择商品", "收款提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      var order_arry = [];
      for (var i = 0; i < this.shop_data.length; i++) {
        var my_li = this.shop_data[i];
        var item = {};
        item["item_no"] = my_li["item_no"];
        item["item_name"] = my_li["item_name"];
        item["item_num"] = my_li["active_num"];
        item["item_money"] = my_li["item_money"];
        order_arry.push(item);
      }
      var order_id =
        "SC" + this.$comjs.getNowFormatDate() + this.$comjs.RndNum(5);
      var xinxi = {
        id: 5,
        type: 3,
        mer_no: this.$locs.get("mer_no"), //商户编号
        shop_no: this.$locs.get("shop_no"), //分店编号
        waiter_no: this.$locs.get("waiter_no"), //服务员编号
        order_id: order_id, //订单编号（type=3时必填）
        order_item: order_arry, //订单商品列表（type=3时必填，二维数组，item_no 编号，item_name 名称，item_num 数量，item_money 单价）
        order_money: this.heji_money, //订单金额（type=3时必填）
        login_key: this.$locs.get("login_key")
      };
      var commerhttp = this.$comjs.gethttp();
      this.$api.post(commerhttp, xinxi).then(res => {
        if (res["state"] == 51) {
          var data = {
            heji_money: this.heji_money,
            order_id: order_id
          };
          this.$bus.$emit(type, data);
        } else {
          this.$message.error(res["Msg"]);
        }
      });
    }
    // saoma: function() {
    //   if (this.shop_data.length == 0) {
    //     this.$alert("请先选择商品", "收款提示", {
    //       confirmButtonText: "确定",
    //       callback: action => {}
    //     });
    //     return;
    //   }
    //   var data = {
    //     heji_money: this.heji_money,
    //     order_id:order_id,
    //   };
    //   this.$bus.$emit("saoma", data);
    // }
  },
  watch: {
    shop_data: {
      handler(val, oldVal) {
        var money = 0;
        var data = this.shop_data;
        for (var i = data.length - 1; i >= 0; i--) {
          money += data[i]["active_num"] * data[i]["item_money"];
        }
        this.heji_money = money.toFixed(2);
      },
      deep: true
    }
  }
};
</script>
<style>
#shop .el-input{
  width: 260px;
}
#shop .el-input .el-input-group__append{
  cursor: pointer;
}
.el-row {
  overflow-y: auto;
  position: absolute;
  top: 10px;
  left: 110px;
  right: 10px;
  bottom: 50px;
}
.right {
  background-color: #fafafa;
}

.right nav {
  position: fixed;
  top: 66px;
  left: 400px;
  bottom: 110px;
  background-color: #ffffff;
}

.right .btn_box{
  position: fixed;
  bottom: 60px;
  right: 0;
  background: #fff;
  height: 40px;
  padding: 5px;
  left: 400px;
  border-top: solid 1px #dcdfe6;
}

.right .btn_box .el-button{
  float: right;
}

.right nav a {
  width: 100px;
  text-align: center;
  display: block;
  line-height: 50px;
  color: #000;
  border-bottom: solid 1px #fafafa;
  cursor: pointer;
}

.right nav a.active {
  background-color: #fafafa;
  font-weight: bold;
}

.right nav a:hover {
  background-color: #fafafa;
}

.right .grid-content {
  margin-bottom: 10px;
  cursor: pointer;
}

.right .grid-content span {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  background: center center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  position: relative;
}

.right .grid-content span h1 {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.right .grid-content .box {
  background-color: #fff;
  padding: 10px;
  height: 60px;
  position: relative;
  z-index: -1;
}



.right .grid-content .box .money {
  position: absolute;
  right: 10px;
  bottom: 5px;
  color: red;
}

.right .grid-content .box .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#shop {
  position: relative;
}

.left {
  width: 400px;
  position: fixed;
  top: 66px;
  left: 0;
  bottom: 60px;
  background-color: #fff;
  border-right: solid #e5e5e5 1px;
  box-sizing: border-box;
  padding-bottom: 50px;
  padding-top: 50px;
  overflow-y: auto;
}

.left li {
  padding: 0 10px;
}

.left li:first-child {
  background-color: #f2f2f2;
  position: fixed;
  top: 66px;
  left: 0;
  width: 400px;
  z-index: 9999;
  box-sizing: border-box;
}

.left span {
  width: 20%;
  float: left;
  line-height: 50px;
  text-align: center;
}

.left span i {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  border: solid 1px #0091ff;
  color: #0091ff;
}

.left span i:last-child {
  background-color: #0091ff;
  color: #fff;
}

.left span a {
  margin: 0 5px;
}

.left li span:first-child {
  width: 30%;
  text-align: left;
}

.left li span:last-child {
  width: 10%;
}

.left li span:last-child i {
  background-color: red;
  border-color: red;
}

.left .btn_box {
  position: fixed;
  left: 0;
  bottom: 60px;
  width: 400px;
}

.left .btn_box div:last-child button {
  text-align: center;
  line-height: 50px;
  float: left;
  cursor: pointer;
  background-color: #56758d;
  color: #fff;
}

.left .btn_box button:hover {
  background-color: #486377;
}

.right {
  position: fixed;
  top: 66px;
  left: 401px;
  right: 0;
  bottom: 60px;
}

footer {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
}

.heji {
  font-size: 18px;
  font-weight: bold;
  line-height: 60px;
  color: red;
}

footer div:first-child {
  padding-left: 20px;
}

footer button {
  width: 200px;
  line-height: 60px;
  background-color: red;
  color: #fff;
  cursor: pointer;
  float: left;
}
</style>
