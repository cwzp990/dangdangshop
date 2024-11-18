<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import storage from '../../utils/storageUtil'

const userStore = useUserStore()
const { username, password } = toRefs(
  reactive({
    username: '',
    password: '',
  }),
)
async function login() {
  await userStore.login(username.value, password.value)
  if (storage.get('token')) {
    router.push({ name: 'ctgy' })
  }
}
</script>

<template>
  <div class="login">
    <svg class="login-pic" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5Zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3Z" /><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0Zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0Z" /></svg>
    <div class="username">
      <input
        v-model="username"
        type="text"
        class="username-input"
        name="username"
        placeholder="请输入用户名"
      >
    </div>
    <div class="password">
      <input
        v-model="password"
        type="password"
        class="password-input"
        name="password"
        placeholder="请输入密码"
      >
    </div>
    <div class="login-btn">
      <button @click="login()">
        登录
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  &-pic {
    width: 1.22rem;
    height: 1.4rem;
    color: #888;
  }
  .username {
    margin-top: 0.4rem;
    width: 80%;
    border-bottom: 1px solid #888;
    &-input {
      width: 100%;
      height: 0.4rem;
      border: none;
      outline: none;
      font-size: 0.16rem;
      color: #888;
    }
  }
  .password {
    margin-top: 0.2rem;
    width: 80%;
    border-bottom: 1px solid #888;
    &-input {
      width: 100%;
      height: 0.4rem;
      border: none;
      outline: none;
      font-size: 0.16rem;
      color: #888;
    }
  }
  .login-btn {
    margin-top: 0.4rem;
    width: 80%;
    button {
      width: 100%;
      height: 0.4rem;
      border: none;
      outline: none;
      font-size: 0.16rem;
      color: #fff;
      background-color: #888;
    }
  }
}
</style>
