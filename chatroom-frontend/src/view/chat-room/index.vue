<template>
  <div class="chatroom">
    <van-nav-bar :title="`聊天室 (${onlineUsers.length}/${MAX_USERS})`">
      <!-- <template #right>
        <van-icon name="ellipsis" size="18" @click="goToOnlineUsersPage" />
      </template> -->
    </van-nav-bar>
    <!-- <van-popup v-model:show="showMemberList" position="right">
      <van-cell-group>
        <van-cell v-for="user in onlineUsers" :key="user.id" :title="user.nickname" />
      </van-cell-group>
    </van-popup> -->
    <div class="chat-container">
      <div class="chat-message" v-for="(message, index) in messages" :key="index">
        <div v-if="message.type === 'system'" class="system-message">
          {{ message.content }}
        </div>
        <div v-else class="user-message">
          <div v-if="message.sender === nickname" class="self-message">
            <div class="message-bubble">
              <img :src="message.avatar" class="avatar" />
              <div class="message-content">
                <div class="message-sender">{{ message.sender }}</div>
                <div v-if="message.type === 'text'">{{ message.content }}</div>
                <img v-else :src="message.content" alt="图片" />
              </div>
            </div>
          </div>
          <div v-else class="other-message">
            <div class="message-bubble">
              <img :src="message.avatar" class="avatar" />
              <div class="message-content">
                <div class="message-sender">{{ message.sender }}</div>
                <div v-if="message.type === 'text'">{{ message.content }}</div>
                <img v-else :src="message.content" alt="图片" />
              </div>
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
      <van-icon name="plus" size="24" @click="showActionSheet = true" />
      <van-action-sheet
        v-model:show="showActionSheet"
        :actions="actions"
        @select="onSelectAction"
      />
      <van-button type="primary" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSocketStore } from '../../stores/socketStore';

const nickname = ref('');
const inputMessage = ref('');
const showMemberList = ref(false);
const showActionSheet = ref(false);
const showCamera = ref(false);
const MAX_USERS = 50;
const router = useRouter();
const socketStore = useSocketStore();
const { onlineUsers, messages, sendMessage, scrollToBottom } = socketStore;

const actions = [
  { name: '选择照片', method: 'selectPhoto' },
  { name: '拍摄相机', method: 'takePhoto' }
];

const onSelectAction = (action) => {
  if (action.method === 'selectPhoto') {
    // 触发文件选择器
    document.getElementById('fileInput').click();
  } else if (action.method === 'takePhoto') {
    // 触发拍摄相机
    showCamera.value = true;
  }
};

const goToOnlineUsersPage = () => {
  router.push('/online-users');
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chatroom {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  width: 100%;
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
  display: flex;
  align-items: center;
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #e5f6ff;
  word-wrap: break-word;
}

.self-message .message-bubble {
  background-color: #dcf8c6;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
  width: 100%;
  background-color: #fff; /* 添加背景色 */
}

.input-container .van-field {
  flex: 1;
  margin-right: 10px;
}

.input-container .van-button {
  margin-left: 10px; /* 添加间距 */
}
</style>