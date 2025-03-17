<template>
  <div class="online-users">
    <van-nav-bar title="在线用户" left-arrow @click-left="goBack" />
    <van-cell-group>
      <van-cell v-for="user in onlineUsers" :key="user.id" :title="user.nickname">
        <template #icon>
          <img :src="user.avatar" class="avatar" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSocket } from '../../utils/composables/socket';

const router = useRouter();
const { onlineUsers } = useSocket();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.online-users {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>