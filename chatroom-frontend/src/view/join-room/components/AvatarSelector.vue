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
    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none;" />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const selectedAvatar = inject('selectedAvatar');
const showOptions = ref(false);
const fileInput = ref(null);

const actions = [
  { name: '选择素材库', method: 'selectFromLibrary' },
  { name: '上传照片', method: 'uploadPhoto' },
  { name: '拍照', method: 'takePhoto' }
];

function onSelect(action) {
  if (action.method === 'selectFromLibrary') {
    showOptions.value = false;
    showLibrary.value = true;
  } else if (action.method === 'uploadPhoto') {
    showOptions.value = false;
    fileInput.value.click();
  } else if (action.method === 'takePhoto') {
    showOptions.value = false;
    showCamera.value = true;
  }
}

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const showLibrary = inject('showLibrary');
const showCamera = inject('showCamera');
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