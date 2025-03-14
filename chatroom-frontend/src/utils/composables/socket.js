import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const onlineUsers = ref([]);
const messages = ref([]);

export function useSocket(nickname, inputMessage = ref('')) {
  const isLoggedIn = ref(false);
  const selectedAvatar = ref('/path/to/default/avatar.jpg'); // 默认头像路径

  const joinChatroom = () => {
    return new Promise((resolve, reject) => {
      if (!nickname.value) {
        nickname.value = generateRandomNickname();
      }
      socket.emit('join', { nickname: nickname.value, avatar: selectedAvatar.value }, (response) => {
        if (response.success) {
          nickname.value = response.nickname; // 更新为唯一昵称
          isLoggedIn.value = true;
          console.log('Joined chatroom successfully'); // 调试信息
          resolve();
        } else {
          console.log('Failed to join chatroom'); // 调试信息
          reject();
        }
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

  const generateRandomNickname = () => {
    const adjectives = ['快乐的', '悲伤的', '愤怒的', '兴奋的', '勇敢的'];
    const animals = ['猫', '狗', '兔子', '老虎', '狮子'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective}${animal}`;
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

  socket.on('user-left', (nickname) => {
    const index = onlineUsers.value.findIndex(u => u.nickname === nickname);
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
    onlineUsers.value = users;
  });

  socket.on('receive-message', (message) => {
    messages.value.push(message);
    scrollToBottom();
  });

  socket.on('receive-image', (imageData) => {
    messages.value.push(imageData);
    scrollToBottom();
  });

  window.addEventListener('beforeunload', () => {
    socket.emit('leave', { nickname: nickname.value });
  });

  return {
    isLoggedIn,
    onlineUsers,
    messages,
    joinChatroom,
    sendMessage,
    handleImageUpload,
    scrollToBottom,
    selectedAvatar
  };
}