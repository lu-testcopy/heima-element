import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/home.vue')
const Order = () => import('../views/order/order.vue')
const Welcome = () => import('../views/welcome/welcome.vue')
const Users = () => import('../views/users/users.vue')
const Roles = () => import ('../views/roles/roles.vue')
const Rights = () => import('../views/rights/rights.vue')
const Goods = () => import('../views/goods/goods.vue')
const Params = () => import('../views/goods/params.vue')
const Categories = () => import('../views/goods/Categories.vue')
const Add = () => import('../views/goods/children/Add.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/welcome',
    component: Home,
    children: [
      {
       path: '/welcome',
       component: Welcome
      },
      {
       path: '/users',
       component: Users
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/goods/add',
        component: Add
      }
    ]
  },
  
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 配置路由守卫
router.beforeEach((to ,from , next) => {
    const user = window.localStorage.getItem('cookie')
    if(to.path !== '/login') {
      if(user) {
        next ()
      } else {
        router.push('/login')
      }
    } else if(to.path === '/login') {
      next()
    }
  })
export default router
