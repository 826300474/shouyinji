<template>
	<div id="saoma">
         <el-dialog title="扫码收款" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
          <el-form :model="form">
            <el-form-item label="编码">
              <el-input v-model="form.name" disabled="disabled"></el-input>
            </el-form-item>
          </el-form>
          <img src="../../assets/image/saoma.png" alt="">
          <div class="saoma_titie">扫码中，请耐心等待...</div>
        </el-dialog>   
    </div>	
</template>
<script>
export default {
    data() {
        return {
        	dialogVisible:false,	 
	        form: {
	        	shoukuan:0,
				shishou:0,
				zhaoling:0,	
	        },
        }
    },
    mounted() {
    	this.$bus.$on('saoma', res => {
        	this.dialogVisible = true;	
        	this.form.shoukuan = res.heji_money; 
        })    
    },
    methods: {
    	handleClose:function(){
    		this.form.shishou = 0;
    		this.form.zhaoling = 0;
    		this.dialogVisible = false;		
    	},
    	jiezhang:function(){
    		this.form.shishou = 0;
    		this.form.zhaoling = 0;
    		this.dialogVisible = false;	
    		this.$message({
	          message: '恭喜你，收款成功',
	          type: 'success'
	        });
    	},
    },
    watch:{
    	form: {
            handler(val, oldVal) {
                if(this.form.shishou > 0 && this.form.shoukuan > 0){
                	this.form.zhaoling = this.form.shishou - this.form.shoukuan;	
                }
            },
            deep: true
        }
    }
}
</script>
<style>
#saoma img{
	display: block;
	width: 30%;
	margin: 50px auto;
}
#saoma .saoma_titie{
	text-align: center;
	font-size: 26px;
	padding-bottom: 20px;
}
#saoma .el-input__inner{
	height: 60px!important;
	font-size: 20px!important;
	font-weight: bold!important;
}
</style>