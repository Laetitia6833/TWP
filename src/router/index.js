import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddList from '../views/AddList.vue'
import Post from '../components/Post.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/addList',
    name: 'AddList',
    component: AddList
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
