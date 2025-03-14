<template>
  <van-popup v-model:show="showUploader" position="bottom">
    <van-uploader
      v-model="fileList"
      :after-read="onAfterRead"
      accept="image/*"
      max-count="1"
      show-upload="false"
    >
      <van-button type="primary">选择照片或拍照</van-button>
    </van-uploader>
  </van-popup>
</template>

<script setup>
import { ref, inject } from 'vue';

const selectedAvatar = inject('selectedAvatar');
const showUploader = inject('showUploader');

const fileList = ref([]);

function onAfterRead(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedAvatar.value = e.target.result;
    showUploader.value = false;
  };
  reader.readAsDataURL(file.file);
}
</script>

<style scoped>
.van-uploader {
  padding: 1rem;
}
</style>