<template>
  <div id="main">
     <footer-view />
     <router-view></router-view>
     <payxianjin-view />
     <paysao-view />
     <addgood-view />
     <search-view />
     <guadan-view />
     <qudan-view />
  </div>
</template>
<script>
  import FooterView from '../components/Footer/'
  import PayxianjinView from '../components/Payxianjin/'
  import PaysaoView from '../components/Paysao/'
  import AddgoodView from '../components/Addgood/'
  import SearchView from '../components/Search/'
  import GuadanView from '../components/Guadan/'
  import QudanView from '../components/Qudan/'
  export default {
    name: 'main',
    methods: {
      
    },
    components:{
      FooterView,
      PayxianjinView,
      PaysaoView,
      AddgoodView,
      SearchView,
      GuadanView,
      QudanView
    },
    data () {
      return {
         
      }
    }
  }
</script>
<style>
</style>
