<template>
	<div id="login">
		<el-form ref="form" :model="form" label-width="60px">
			<p>用户登录</p>
			<div class="input-box">
                <el-input :autofocus="true" placeholder="输入您的商户编号" type="number" v-model="form.mer_no">
                	<template slot="prepend">商编</template>
                </el-input>
            </div>
            <div class="input-box">
                <el-input :autofocus="true" placeholder="输入您的工号" type="number" v-model="form.waiter_no">
                	<template slot="prepend">工号</template>
                </el-input>
            </div>
            <div class="input-box">
                <el-input :autofocus="true" placeholder="输入您的登录密码" type="password" v-model="form.password">
                	<template slot="prepend">密码</template>
                </el-input>
            </div>
			<el-button type="primary" @click="denglu">登录</el-button>
		</el-form>	
	</div>
</template>
<script>
export default {
  name: "login",
  created() {
    if (this.$locs.get("mer_no")) {
      this.form.mer_no = this.$locs.get("mer_no");
    }
  },
  data() {
    return {
      form: {
        mer_no: "",
        waiter_no: "",
        password: ""
      }
    };
  },
  methods: {
    denglu: function() {
      var xinxi = {
        id: 3,
        password: this.form.password,
        mer_no: this.form.mer_no,
        waiter_no: this.form.waiter_no
      };
      var commerhttp = this.$comjs.gethttp();
      this.$api.post(commerhttp, xinxi).then(res => {
        if (res["state"] == 31) {
          this.$store.dispatch("SET_LOGIN", res["data"]);
          this.$router.replace("/main");
        } else {
          this.$message.error(res["Msg"]);
        }
      });
    }
  }
};
</script>
<style>
#login p {
  text-align: center;
  padding-bottom: 30px;
  font-size: 20px;
}
#login .el-form {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  width: 500px;
  border-radius: 4px;
}
#login .el-button {
  width: 100%;
  line-height: 60px;
  padding: 0;
  font-size: 16px;
}
#login .el-input__inner {
  height: 60px;
  font-size: 16px;
}
#login .el-form-item__label {
  line-height: 60px;
  font-size: 16px;
}
#login .input-box {
  margin-bottom: 20px;
  position: relative;
}
</style>