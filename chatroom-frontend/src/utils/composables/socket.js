import { ref } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const onlineUsers = ref([]);
const messages = ref([]);

export function useSocket(nickname, inputMessage = ref('')) {
  const isLoggedIn = ref(false);

  const joinChatroom = () => {
    if (nickname.value) {
      socket.emit('join', nickname.value);
      isLoggedIn.value = true;
    }
  };

  const sendMessage = () => {
    if (inputMessage.value) {
      const message = {
        type: 'text',
        sender: nickname.value,
        content: inputMessage.value
      };
      socket.emit('send-message', message);
      messages.value.push(message);
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
        content: reader.result
      };
      socket.emit('send-image', imageData);
      messages.value.push(imageData);
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

  socket.on('user-joined', (user) => {
    messages.value.push({
      type: 'system',
      content: `${user.nickname} 加入了聊天室`
    });
    scrollToBottom();
  });

  socket.on('user-left', (user) => {
    messages.value.push({
      type: 'system',
      content: `${user.nickname} 离开了聊天室`
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

  return {
    isLoggedIn,
    onlineUsers,
    messages,
    joinChatroom,
    sendMessage,
    handleImageUpload,
    scrollToBottom
  };
}