import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Thanks from '../views/Thanks.vue'
import Shops from '../views/Shops.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Done from '../views/Done.vue'
// import { metadata } from 'core-js/fn/reflect'
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shops',
    component: Shops
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Home,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
    props: true,
  },
  {
    path: '/done',
    name: 'done',
    component: Done
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) && !store.state.auth
  ) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
