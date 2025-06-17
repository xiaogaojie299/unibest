import {
  login as _login,
  getUserInfo as _getUserInfo,
  wxLogin as _wxLogin,
  logout as _logout,
  getWxCode,
} from '@/api/login'
import { getToken, tokenKey, getTokenKey } from '@/utils/login'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from '@/utils/toast'
import { IUserInfoVo } from '@/api/login.typings'

// 初始化状态
const userInfoState: IUserInfoVo = {
  id: 0,
  username: '',
  avatar: '/static/images/default-avatar.png',
  token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    const userToken = ref(getToken())
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      } else {
        val.avatar = 'https://oss.laf.run/ukw0y1-site/avatar.jpg?feige'
      }
      userInfo.value = val
    }

    const setUsreToken = (token: string) => {
      uni.setStorageSync(getTokenKey(), token)
      userToken.value = token
    }

    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: { mobile: string; code: string }) => {
      try {
        const res = await _login(credentials)
        console.log('登录信息', res)
        if (res.code === 200) {
          let token = res.data.access_token
          setUsreToken(token)
          getUserInfo()
        }
        return res
      } catch (error) {
        console.log('登录失败', error)
        Promise.reject(error)
      }
    }
    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      const res = await _getUserInfo()
      const userInfo = res.data
      setUserInfo(userInfo)
      uni.setStorageSync('userInfo', userInfo)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
    }
    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      _logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const data = await getWxCode()
      console.log('微信登录code', data)
      const res = await _wxLogin({ code: data.code })
      console.log('微信登录结果', res)
      return
    }

    return {
      userToken,
      userInfo,
      login,
      wxLogin,
      getUserInfo,
      setUserAvatar,
      logout,
    }
  },
  {
    persist: true,
  },
)
