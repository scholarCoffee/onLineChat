import { defineStore } from 'pinia';

export const defineUserInfo = defineStore('user', {
  state: () => ({
    userInfo: {},
    total: 0
  }),
  actions: {
    setUserInfo(obj) {
      const { key, nickname, avatar } = obj || {}
      this.userInfo[key] = { nickname, avatar };
      if (this.total < 50) {
        this.total++;
      }
    },
    deleteUserInfo(key) {
      delete this.userInfo[key];
      if (this.total > 0) {
        this.total--;
      }
    },
    getUserInfo(key) {
      return this.userInfo[key];
    }
  }
});
