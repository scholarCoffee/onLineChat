import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOnlineUsersStore = defineStore('onlineUsers', () => {
  const onlineUsers = ref([]);
  const onlineMessage = ref([]);

  const setOnlineUsers = (users) => {
    onlineUsers.value = users;
  };

  const setOnlineMessage = (message) => {
    onlineMessage.value.push(message);
  };

  const addUser = (user) => {
    onlineUsers.value.push(user);
  };

  const removeUser = (userId) => {
    const index = onlineUsers.value.findIndex(user => user.id === userId);
    if (index !== -1) {
      onlineUsers.value.splice(index, 1);
    }
  };

  const removeMessage = (messageId) => {
    const index = onlineMessage.value.findIndex(message => message.id === messageId);
    if (index !== -1) {
      onlineMessage.value.splice(index, 1);
    }
  };

  return {
    onlineUsers,
    onlineMessage,
    setOnlineUsers,
    setOnlineMessage,
    addUser,
    removeUser,
    removeMessage
  };
});