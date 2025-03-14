<template>
  <div class="chatroom">
    <van-nav-bar
      title="聊天室 ({{ onlineUsers.length }}/{{ MAX_USERS }})"
      right-text="更多"
      @click-right="showMemberList = true"
    />
    <van-popup v-model:show="showMemberList" position="right">
      <van-cell-group>
        <van-cell v-for="user in onlineUsers" :key="user.id" :title="user.nickname" />
      </van-cell-group>
    </van-popup>
    <div class="chat-container">
      <div class="chat-message" v-for="(message, index) in messages" :key="index">
        <div v-if="message.type === 'system'" class="system-message">
          {{ message.content }}
        </div>
        <div v-else class="user-message">
          <div v-if="message.sender === nickname" class="self-message">
            <div class="message-bubble">
              <div v-if="message.type === 'text'">{{ message.content }}</div>
              <img v-else :src="message.content" alt="图片" />
            </div>
          </div>
          <div v-else class="other-message">
            <div class="message-sender">{{ message.sender }}</div>
            <div class="message-bubble">
              <div v-if="message.type === 'text'">{{ message.content }}</div>
              <img v-else :src="message.content" alt="图片" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-container">
      <van-field
        v-model="inputMessage"
        placeholder="请输入消息"
      />
      <van-uploader
        :after-read="handleImageUpload"
        accept="image/*"
        :max-count="1"
        multiple
        style="display: inline-block; margin-left: 10px;"
      />
      <van-button type="primary" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSocket } from '../../utils/composables/socket';

const nickname = ref('');
const inputMessage = ref('');
const showMemberList = ref(false);
const { onlineUsers, messages, sendMessage, handleImageUpload, scrollToBottom } = useSocket(nickname, inputMessage);

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chatroom {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.system-message {
  text-align: center;
  color: #999;
  margin: 10px 0;
}

.user-message {
  margin-bottom: 10px;
}

.self-message {
  text-align: right;
}

.other-message {
  text-align: left;
}

.message-sender {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.message-bubble {
  display: inline-block;
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #e5f6ff;
  word-wrap: break-word;
}

.self-message .message-bubble {
  background-color: #dcf8c6;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
}

.input-container .van-field {
  flex: 1;
  margin-right: 10px;
}
</style>