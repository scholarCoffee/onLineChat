<template>
  <div class="join-chatroom">
    <AvatarSelector />
    <AvatarLibrary />
    <AvatarCamera />
    <van-field v-model="nickname" placeholder="请输入昵称" />
    <van-button type="primary" @click="handleLogin">登录</van-button>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import { useSocket } from '../../utils/composables/socket';
import AvatarSelector from './components/AvatarSelector.vue';
import AvatarLibrary from './components/AvatarLibrary.vue';
import AvatarCamera from './components/AvatarCamera.vue';

const nickname = ref('');
const router = useRouter();
const { joinChatroom, isLoggedIn } = useSocket(nickname);

const defaultAvatars = [
  '/onlineChat1.jpg',
  '/onlineChat2.jpg',
  '/onlineChat3.jpg',
  '/onlineChat4.jpg',
  '/onlineChat5.jpg',
  '/onlineChat6.jpg',
  '/onlineChat7.jpg',
  '/onlineChat8.jpg',
  '/onlineChat9.jpg',
  '/onlineChat10.jpg'
];

const selectedAvatar = ref(getRandomDefaultAvatar());
const showLibrary = ref(false);
const showCamera = ref(false);

function getRandomDefaultAvatar() {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
}

const handleLogin = async () => {
  await joinChatroom();
  console.log('isLoggedIn:', isLoggedIn.value); // 调试信息
  if (isLoggedIn.value) {
    router.push('/chatroom'); // 假设聊天页面的路由是 /chatroom
  }
};

provide('selectedAvatar', selectedAvatar);
provide('showLibrary', showLibrary);
provide('showCamera', showCamera);
provide('defaultAvatars', defaultAvatars);
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