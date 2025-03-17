import { defineStore } from 'pinia';
import { useSocket } from '../utils/composables/socket';
import { ref } from 'vue';

export const useSocketStore = defineStore('socketStore', () => {
  const inputMessage = ref('');
  const { messages, sendMessage, scrollToBottom, joinChatroom, onlineUsers } = useSocket(null, inputMessage);

  return {
    inputMessage,
    onlineUsers,
    messages,
    sendMessage,
    scrollToBottom,
    joinChatroom
  };
});
