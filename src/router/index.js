import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/home.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/register/register.vue'
import Shop from '../views/shop/Shop.vue'
import OrderList from '../views/orderlist/OrderList.vue'
import CartList from '../views/cartList/CartList.vue'
import Order from '../views/orderConfirmation/Order.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 异步加载网页，不会同步加载网页
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: CartList,
    // 异步加载网页，不会同步加载网页
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList.vue')
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: Order,
    // 异步加载网页，不会同步加载网页
    component: () => import(/* webpackChunkName: "order" */ '../views/orderConfirmation/Order.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: OrderList,
    // 异步加载网页，不会同步加载网页
    component: () => import(/* webpackChunkName: "orderlist" */ '../views/orderlist/OrderList.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: Shop,
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    // 在访问Login之前才会执行的函数
    beforeEnter (to, from, next) {
      console.log(to, from)
      // 自然运算
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    component: () => import(/* webpackChunkName: "register" */ '../views/register/register.vue'),
    // 在访问Login之前才会执行的函数
    beforeEnter (to, from, next) {
      // 自然运算
      const isLogin = localStorage.isLogin
      if (isLogin) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// beforeEach：在访问每个页面前执行的函数
router.beforeEach((to, from, next) => {
  // 从本地存储取当前的登录情况
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})
export default router
