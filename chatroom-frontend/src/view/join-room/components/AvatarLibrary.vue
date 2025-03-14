<template>
  <van-popup v-model:show="showLibrary" position="bottom">
    <div class="default-avatars">
      <span>选择一个默认头像:</span>
      <div class="avatars">
        <img
          v-for="(avatar, index) in defaultAvatars"
          :key="index"
          :src="avatar"
          alt="默认头像"
          class="default-avatar"
          @click="selectDefaultAvatar(avatar)"
        />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, inject } from 'vue';

const selectedAvatar = inject('selectedAvatar');
const showLibrary = inject('showLibrary');

// 将 public 目录下的图片路径添加到 defaultAvatars 数组中，并按顺序排列
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

function selectDefaultAvatar(avatar) {
  selectedAvatar.value = avatar;
  showLibrary.value = false;
}
</script>

<style scoped>
.default-avatars {
  text-align: center;
  margin-top: 1rem;
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.default-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.default-avatar:hover {
  transform: scale(1.1);
}
</style>