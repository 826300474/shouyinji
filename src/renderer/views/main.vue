<template>
  <div id="main">
     <footer-view />
     <router-view></router-view>
     <payxianjin-view />
     <paysao-view />
  </div>
</template>
<script>
  import FooterView from '../components/Footer/'
  import PayxianjinView from '../components/Payxianjin/'
  import PaysaoView from '../components/Paysao/'
  export default {
    name: 'main',
    methods: {
      
    },
    components:{
      FooterView,
      PayxianjinView,
      PaysaoView
    },
    data () {
      return {
         
      }
    }
  }
</script>
<style>
</style>
