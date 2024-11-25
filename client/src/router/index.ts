import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import storage from '../utils/storageUtil'

const ctgy = () => import('../views/ctgy/index.vue')
const books = () => import('../views/books/index.vue')
const shopcarts = () => import('../views/shopcarts/index.vue')
const search = () => import('../views/search/index.vue')
const login = () => import('../views/user/index.vue')
const bookdetail = () => import('../views/bookdetail/index.vue')
const goods = () => import('../views/bookdetail/components/goods.vue')
const comments = () => import('../views/bookdetail/components/comments.vue')
const home = () => import('../views/home/index.vue')
const order = () => import('../views/order/index.vue')
const ordersort = () => import('../views/order/components/sort.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    component: home,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy,
  },
  {
    name: 'books',
    path: '/books',
    component: books,
  },
  {
    name: 'shopcarts',
    path: '/shopcarts',
    component: shopcarts,
  },
  {
    name: 'search',
    path: '/search',
    component: search,
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    beforeEnter: (_to, _from, next) => {
      const token = storage.get('token')
      if (token)
        next({ name: 'ctgy' })
      else
        next()
    },
  },
  {
    name: 'bookdetail',
    path: '/bookdetail',
    component: bookdetail,
    redirect: { name: 'goods' },
    children: [
      {
        name: 'goods',
        path: 'goods',
        component: goods,
        meta: {
          from: '',
        },
        beforeEnter: (to, from, next) => {
          to.meta.from = from.name // set meta.from
          next()
        },
      },
      {
        name: 'comments',
        path: 'comments',
        component: comments,
      },
    ],
  },
  {
    path: '/order',
    name: 'order',
    component: order,
  },
  {
    path: '/ordersort',
    name: 'ordersort',
    component: ordersort,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// auth guard
router.beforeEach((to, from, next) => {
  const token = storage.get('token')
  if (token || to.name === 'login')
    next()
  else
    next({ name: 'login' })
})

export default router
