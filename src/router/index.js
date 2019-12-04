import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/Index'
import list from '@/pages/List'
import cart from '@/pages/Cart'
import my from '@/pages/My'
import detail from '@/pages/Detail'
import goods from '@/components/Goods'
import comments from '@/components/Comments'
import login from '@/pages/Login'
import register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
    },
    {
      path: '/list',
      component: list
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/my',
      component: my
    },
    {
      path: '/detail',
      component: detail,
      children: [
        {
          path: '',
          redirect:'goods'
        },
        {
          path: 'goods',
          component: goods
        },
        {
          path: 'comments',
          component: comments
        }
      ]
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path: '*',
      redirect:'/index'
    }
  ]
})
