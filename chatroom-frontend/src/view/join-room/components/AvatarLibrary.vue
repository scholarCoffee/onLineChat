<template>
  <van-popup v-model:show="showLibrary" position="bottom">
    <div class="default-avatars">
      <div class="avatars">
        <img
          v-for="(avatar, index) in shuffledAvatars"
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
const defaultAvatars = inject('defaultAvatars');

const shuffledAvatars = ref(shuffleArray([...defaultAvatars]));

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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