<template style="-webkit-app-region: drag">
	<header class="clearfix" @click="login">
	  <div class="header_left">
		  <h1>{{mer_no}}</h1>
		  <div @click="shouyin">收银</div>
		  <div @click="zhangdan">账单</div>
		  <div @click="huiyuan">会员</div>
	  </div>
      <div class="shouyinyuan">收银员：{{waiter_no}}</div>
    </header>
</template>
<script>
export default {
    data() {
        return {
        	mer_no:this.$locs.get('mer_no'),
        	waiter_no:this.$locs.get('waiter_no'),
        }
    },
    methods: {
    	login:function(){
    		this.$bus.$emit('login')  	
		},
		zhangdan:function(){
			this.$router.push("/main/zhangdan");
		},
		shouyin:function(){
			this.$router.push("/main/");	
		},
		huiyuan:function(){

		}
    },
}
</script>
<style>
header{
	background-color: #666;
	padding: 20px;
	position: fixed;
	box-sizing: border-box;
	z-index: 1000;
	width: 100%;
}
header .header_left{
	float: left;
} 
header h1{
	color: #fff;
	font-size: 20px;
	float: left;
	margin-right: 20px;
}
header div{
	float: left;
	font-size: 20px;
	cursor: pointer;
	color: #fff;
	margin-right: 20px;
}
header .shouyinyuan{
	float: right;
	color: #fff;
}
</style>