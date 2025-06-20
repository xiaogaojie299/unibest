import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore(
  'system',
  () => {
    // 定义用户信息
    const parkId = ref(uni.getStorageSync('CACHE_PARKID') || '')
    const parkName = ref(uni.getStorageSync('CACHE_PARKNAME') || '')

    const SET_PARKID = (id) => {
      parkId.value = id
      uni.setStorageSync('CACHE_PARKID', id)
    }

    const SET_PARKNAME = (name) => {
      parkName.value = name
      uni.setStorageSync('CACHE_PARKNAME', name)
    }
    return {
      parkId,
      parkName,
      SET_PARKID,
      SET_PARKNAME,
    }
  },
  {
    persist: true,
  },
)
