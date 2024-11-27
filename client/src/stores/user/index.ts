import { defineStore } from 'pinia'
export interface UserInfo {
    userid: number
    username: string
    password: string
    address?: string
    valid: number
    age?: number
    birth?: string
    token?: string
  }

export const useUserStore = defineStore('user', {})