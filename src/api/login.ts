import { ICaptcha, IUpdateInfo, IUpdatePassword, IUserInfoVo, IUserLogin } from './login.typings'
import { http } from '@/utils/http'

/**
 * 登录表单
 */
export interface ILoginForm {
  username: string
  password: string
  code: string
  uuid: string
}

/**
 * 获取验证码
 * @returns ICaptcha 验证码
 */
export const getCode = () => {
  return http.get<ICaptcha>('/user/getCode')
}

/**
 * 用户登录
 * @param loginForm 登录表单
 */
export const login = (loginForm: ILoginForm) => {
  return http.post<IUserLogin>('/auth/codeLogin', loginForm)
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return http.post<IUserInfoVo>('/program/profile/index')
  // return http.post<IUserInfoVo>('/program/profile/user-info')
}

/**
 * 退出登录
 */
export const logout = () => {
  return http.get<void>('/user/logout')
}

/**
 * 修改用户信息
 */
export const updateInfo = (data: IUpdateInfo) => {
  return http.post('/user/updateInfo', data)
}

/**
 * 修改用户密码
 */
export const updateUserPassword = (data: IUpdatePassword) => {
  return http.post('/user/updatePassword', data)
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export const getWxCode = () => {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => resolve(res),
      fail: (err) => reject(new Error(err)),
    })
  })
}

/**
 * 微信登录参数
 */

/**
 * 微信登录
 * @param params 微信登录参数，包含code
 * @returns Promise 包含登录结果
 */
export const wxLogin = (data: { code: string }) => {
  return http.post<IUserLogin>('/auth/wx-login-one', data)
}
