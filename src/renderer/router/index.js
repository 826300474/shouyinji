import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/views/login').default,
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/views/main').default,
      children: [
          {
              path: '',
              name: 'frame1',
              component: () => import('../views/frame1.vue')
          }, 
          {
              path: 'zhangdan',
              name: 'zhangdan',
              component: () => import('../views/zhangdan.vue')
          }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
