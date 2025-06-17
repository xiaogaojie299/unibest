import { http } from '@/utils/http'

/**
 * 获取我加入的组织（
 * @returns ICaptcha 验证码
 */
export const getCode = () => {
  return http.post('/program/org/get-user-org')
}
