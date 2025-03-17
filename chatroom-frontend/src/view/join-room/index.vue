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
import io from 'socket.io-client';
import AvatarSelector from './components/AvatarSelector.vue';
import AvatarLibrary from './components/AvatarLibrary.vue';
import AvatarCamera from './components/AvatarCamera.vue';
import { generateRandomNickname } from './../../utils/index';
import { useOnlineUsersStore } from '../../stores/onlineUsersStore';
import { userCurrentUserStore } from '../../stores/currentUserStore'
const onlineUsersStore = useOnlineUsersStore();
const currentUserInfoStore = userCurrentUserStore();

const nickname = ref(generateRandomNickname());
const router = useRouter();
const socket = io('http://localhost:3000');

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

socket.on('online-users', (users) => {
  onlineUsersStore.setOnlineUsers(users || []);
});

function getRandomDefaultAvatar() {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
}

const handleLogin = async () => {
  socket.emit('join', { nickname: nickname.value, avatar: selectedAvatar.value }, (response) => {
    const { success, user } = response || {}
    if (success) {
      const { id, nickname, avatar } = user || {}
      currentUserInfoStore.setCurrentUserInfo({
        id,
        nickname, 
        avatar
      })
      console.log('Joined chatroom successfully'); // 调试信息
      router.push('/chatroom');
    } else {
      console.log('Failed to join chatroom'); // 调试信息
    }
  });
};

provide('socket', socket);
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