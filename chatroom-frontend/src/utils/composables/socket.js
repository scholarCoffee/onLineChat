import { ref } from 'vue';
import io from 'socket.io-client';
import { generateRandomNickname } from '../index.js';

const socket = io('http://localhost:3000');
const messages = ref([]);
const onlineUsers = ref([]);
const currentUserInfo = ref({ nickname: '', avatar: '', id: '' });

export function useSocket(name, inputMessage = ref('')) {
  const selectedAvatar = ref('/path/to/default/avatar.jpg'); // 默认头像路径

  // 加入聊天室
  const joinChatroom = ({
    nickname = ref(''),
    selectedAvatar = ref('/path/to/default/avatar.jpg')
  }) => {
    return new Promise((resolve, reject) => {
      if (!nickname) {
        nickname = generateRandomNickname();
      }
      socket.emit('join', { nickname, avatar: selectedAvatar.value }, (response) => {
        if (response.success) {
          currentUserInfo.value = response.userInfo; // 更新为唯一昵称
          console.log('Joined chatroom successfully'); // 调试信息
          resolve();
        } else {
          console.log('Failed to join chatroom'); // 调试信息
          reject();
        }
        scrollToBottom();
      });
    });
  };

  const sendMessage = () => {
    if (inputMessage.value) {
      const message = {
        type: 'text',
        sender: nickname.value,
        avatar: selectedAvatar.value,
        content: inputMessage.value
      };
      socket.emit('send-message', message);
      inputMessage.value = '';
      scrollToBottom();
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = {
        type: 'image',
        sender: nickname.value,
        avatar: selectedAvatar.value,
        content: reader.result
      };
      socket.emit('send-image', imageData);
      scrollToBottom();
    };
    reader.readAsDataURL(file.file);
  };

  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  socket.on('room-full', () => {
    alert('聊天室已满，请稍后再试');
  });

  socket.on('user-joined', (message) => {
    messages.value.push({
      type: 'system',
      content: message
    });
    scrollToBottom();
  });

  socket.on('user-left', userInfo => {
    const { id, nickname, avatar } = userInfo || {} 
    const index = onlineUsers.value?.findIndex(u => u.nickname === nickname);
    if (index !== -1) {
      onlineUsers.value.splice(index, 1);
    }
    messages.value.push({
      type: 'system',
      content: `${nickname} 离开了聊天室`
    });
    scrollToBottom();
  });

  socket.on('online-users', (users) => {
    onlineUsers.value = users || []
  });

  socket.on('receive-message', (message) => {
    messages.value.push(message);
    scrollToBottom();
  });

  socket.on('receive-image', (imageData) => {
    messages.value.push(imageData);
    scrollToBottom();
  });

  return {
    onlineUsers,
    messages,
    joinChatroom,
    sendMessage,
    handleImageUpload,
    scrollToBottom,
    selectedAvatar
  };
}