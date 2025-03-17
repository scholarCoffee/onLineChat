import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../view/join-room/index.vue') // 懒加载 JoinRoom 组件
  },
  {
    path: '/chatroom',
    component: () => import('../view/chat-room/index.vue') // 懒加载 ChatRoom 组件
  },
  {
    path: '/online-users',
    component: () => import('../view/online-users/index.vue') // 懒加载 OnlineUsers 组件
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;