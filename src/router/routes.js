import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'User Profile',
    component: HomeView,
  },
]
