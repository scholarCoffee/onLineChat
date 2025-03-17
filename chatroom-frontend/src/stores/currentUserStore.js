import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userCurrentUserStore = defineStore('currentUserInfo', () => {
  const currentUserInfo = ref({});

  const setCurrentUserInfo = (users) => {
    currentUserInfo.value = users;
  };

  const resetCurrentUserInfo = () => {
    currentUserInfo.value = [];
 };

  return {
    currentUserInfo,
    setCurrentUserInfo,
    resetCurrentUserInfo
  };
});