<template>
  <van-popup v-model:show="showCamera" position="bottom">
    <div class="camera-container">
      <template v-if="cameraSupported">
        <video ref="video" class="camera-video" autoplay></video>
        <van-button type="primary" @click="takePhoto">拍照</van-button>
      </template>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, inject, watch, onUnmounted } from 'vue';
import { showDialog } from 'vant';

const selectedAvatar = inject('selectedAvatar');
const showCamera = inject('showCamera');
const video = ref(null);
const cameraSupported = ref(true);

watch(showCamera, (newVal) => {
  if (newVal) {
    cameraSupported.value = true;
    checkCameraSupport();
  }
});

function checkCameraSupport() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.value.srcObject = stream;
    }).catch(() => {
      cameraSupported.value = false;
      showCamera.value = false;
      showDialog({
        message: '您的设备不支持相机拍摄。',
        theme: 'round-button',
      })
    });
  } else {
    cameraSupported.value = false;
    showCamera.value = false;
    showDialog({
        message: '您的设备不支持相机拍摄。',
        theme: 'round-button',
    })
  }
}

onUnmounted(() => {
  if (video.value && video.value.srcObject) {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
});

function takePhoto() {
  const canvas = document.createElement('canvas');
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  selectedAvatar.value = canvas.toDataURL('image/png');
  showCamera.value = false;
}

</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.camera-video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>