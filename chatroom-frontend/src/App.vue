<template>
  <div id="app">
    <JoinChatroom v-if="!isLoggedIn" />
    <Chatroom v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JoinChatroom from './view/join-room/index.vue';
import Chatroom from './view/chat-room/index.vue';
import { useSocket } from './utils/composables/socket';

const { isLoggedIn } = useSocket(ref(''));
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
}
</style>