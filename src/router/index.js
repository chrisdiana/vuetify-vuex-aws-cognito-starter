import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

export const defaultRoute = '/home';

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    component: () => import('@/views/Settings'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
  },
  { path: '*', redirect: defaultRoute },
]

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isAuthenticated = store.getters['cognito/isLoggedIn'];
  const isLoginRegister = (to.path == '/login' || to.path == '/register')

  if (requiresAuth && !isAuthenticated) next('/login');
  else if (isLoginRegister && isAuthenticated) next(defaultRoute);
  else next();
});

export default router
