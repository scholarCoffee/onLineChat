<template>
  <div class="online-users">
    <van-nav-bar title="在线用户" left-arrow @click-left="goBack" />
    <div class="user-list">
      <div class="user-item" v-for="user in onlineUsers" :key="user.id">
        <img :src="user.avatar" class="avatar" />
        <div class="nickname">{{ user.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useOnlineUsersStore } from '../../stores/onlineUsersStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const onlineUsersStore = useOnlineUsersStore();
const { onlineUsers } = storeToRefs(onlineUsersStore);

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.online-users {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: flex-start;; /* 添加此行使用户项平铺 */
}

.user-item {
  display: flex;
  flex-direction: column;
}

.user-item {
  display: flex;
  align-items: center;
  width: 100%; /* 调整宽度以适应更多用户项 */
  padding: 10px;
  box-sizing: border-box;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.nickname {
  text-align: center;
  font-size: 14px;
  color: #333;
  flex: 1; /* 使昵称占据剩余空间 */
}
</style>