<template>
  <div class="avatar-selector">
    <div class="avatar-container">
      <img :src="selectedAvatar" alt="头像" class="avatar" @click="showOptions = true" />
    </div>
    <van-popup v-model:show="showOptions" position="bottom">
      <van-action-sheet
        v-model:show="showOptions"
        :actions="actions"
        @select="onSelect"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const selectedAvatar = ref('/onlineChat1.jpg');
const showOptions = ref(false);

const actions = [
  { name: '选择素材库', method: 'selectFromLibrary' },
  { name: '上传照片或拍照', method: 'uploadPhoto' }
];

function onSelect(action) {
  if (action.method === 'selectFromLibrary') {
    showOptions.value = false;
    showLibrary.value = true;
  } else if (action.method === 'uploadPhoto') {
    showOptions.value = false;
    showUploader.value = true;
  }
}

const showLibrary = ref(false);
const showUploader = ref(false);

provide('selectedAvatar', selectedAvatar);
provide('showLibrary', showLibrary);
provide('showUploader', showUploader);
</script>

<style scoped>
.avatar-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
</style>