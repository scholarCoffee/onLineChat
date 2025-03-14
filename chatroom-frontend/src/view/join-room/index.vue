<template>
  <div class="join-chatroom">
    <AvatarSelector />
    <AvatarLibrary />
    <AvatarUploader />
    <van-field v-model="nickname" placeholder="请输入昵称" />
    <van-button type="primary" @click="joinChatroom">登录</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSocket } from '../../utils/composables/socket';
import AvatarSelector from './components/AvatarSelector.vue';
import AvatarLibrary from './components/AvatarLibrary.vue';
import AvatarUploader from './components/AvatarUploader.vue';

const nickname = ref('');
const { joinChatroom } = useSocket(nickname);
</script>

<style scoped>
.join-chatroom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.join-chatroom .van-field {
  width: 100%;
  margin-bottom: 1rem;
}

.join-chatroom .van-button {
  width: 100%;
}
</style>