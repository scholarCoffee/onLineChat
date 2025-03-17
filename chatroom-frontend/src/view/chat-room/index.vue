<template>
  <div class="chatroom">
    <van-nav-bar :title="`聊天室 (${onlineUsers.length}/${MAX_USERS})`">
      <template #right>
        <van-icon name="ellipsis" size="18" @click="goToOnlineUsersPage" />
      </template>
    </van-nav-bar>
    <div class="chat-container">
      <div class="chat-message" v-for="(message, index) in onlineMessage" :key="index">
        <div v-if="message.type === 'system'" class="system-message">
          {{ message.content }}
        </div>
        <div v-else class="user-message">
          <div v-if="message.sender === currentUserInfo.nickname" class="self-message">
            <div class="message-bubble">
              <div class="message-content">
                <div class="message-sender">{{ message.sender }}</div>
                <div v-if="message.type === 'text'">{{ message.content }}</div>
                <img v-else :src="message.content" alt="图片" />
              </div>
              <img :src="message.avatar" class="avatar" />
            </div>
          </div>
          <div v-else class="other-message">
            <div class="message-other">
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
      <!-- <van-icon name="plus" size="24" @click="showActionSheet = true" /> -->
      <van-action-sheet
        v-model:show="showActionSheet"
        :actions="actions"
        @select="onSelectAction"
      />
      <van-button type="primary" @click="onSendMsg">发送</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';
import { useOnlineUsersStore } from '../../stores/onlineUsersStore';
import { storeToRefs } from 'pinia';

const inputMessage = ref('');
const showActionSheet = ref(false);
const showCamera = ref(false);
const MAX_USERS = 50;
const router = useRouter();
const socket = io('http://localhost:3000');
const onlineUsersStore = useOnlineUsersStore();
const { onlineUsers, onlineMessage } = storeToRefs(onlineUsersStore)
const { removeUser, setOnlineMessage } = onlineUsersStore
import { userCurrentUserStore } from '../../stores/currentUserStore';
const currentUserInfoStore = userCurrentUserStore();
const { currentUserInfo } = storeToRefs(currentUserInfoStore)

const actions = [
  { name: '选择照片', method: 'selectPhoto' },
  { name: '拍摄相机', method: 'takePhoto' }
];

const sendMessage = (content) => {
  if (content && currentUserInfo.value.nickname) {
    const message = {
      type: 'text',
      sender: currentUserInfo.value.nickname,
      avatar: currentUserInfo.value.avatar,
      content
    };
    socket.emit('send-message', message);
  }
};

const onSendMsg = () => {
  if (inputMessage.value.trim() !== '') {
    sendMessage(inputMessage.value);
    inputMessage.value = '';
  }
};

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

const scrollToBottom = () => {
  const chatContainer = document.querySelector('.chat-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

onMounted(() => {
  socket.on('room-full', () => {
    alert('聊天室已满，请稍后再试');
  });

  socket.on('receive-message', (message) => {
    setOnlineMessage(message);
    scrollToBottom();
  });

  socket.on('receive-image', (imageData) => {
    setOnlineMessage(imageData);
    scrollToBottom();
  });

  socket.on('user-joined', (user) => {
    const { id, nickname, avatar } = user || {};
    onlineMessage.value.push({
      id,
      type: 'system',
      msgDate:  new Date().toLocaleString(),
      content: `${nickname} 加入了聊天室`
    });
    scrollToBottom();
  });

  socket.on('user-left', (user) => {
    const { id, nickname, avatar } = user || {};
    removeUser(id);
    onlineMessage.value.push({
      id,
      type: 'system',
      msgDate:  new Date().toLocaleString(),
      content: `${nickname} 离开了聊天室`
    });
    scrollToBottom();
  });

  scrollToBottom();
});

onUnmounted(() => {
  socket.disconnect();
  currentUserInfoStore.resetCurrentUserInfo();
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
  width: 100%;
  padding: 10px 0;
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
  justify-content: end;
  align-items: center;
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #e5f6ff;
  word-wrap: break-word;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
  }
}

.message-other {
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: #e5f6ff;
  word-wrap: break-word;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.self-message .message-bubble {
  background-color: #dcf8c6;
  margin-left: auto; /* 右对齐 */
}

.other-message .message-bubble {
  background-color: #e5f6ff;
  margin-right: auto; /* 左对齐 */
}



.message-content {
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 0px;
  border-top: 1px solid #eee;
  width: 100%;
  background-color: #fff; /* 添加背景色 */
}

.input-container .van-field {
  flex: 1;
}

.input-container .send-button {
  margin-right: 5px;
  margin-left: 5px; /* 添加间距 */
  background-color: #409eff; /* 按钮背景色 */
  color: #fff; /* 按钮文字颜色 */
  border-radius: 5px; /* 按钮圆角 */
  padding: 0 15px; /* 按钮内边距 */
}
</style>