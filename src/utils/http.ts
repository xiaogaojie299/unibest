import { CustomRequestOptions } from '@/interceptors/request'

export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        let statusCode = res.data?.code
        let message = res.data?.msg

        // 状态码 2xx，参考 axios 的设计
        if (statusCode >= 200 && statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as IResData<T>)
        } else if (statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // userStore.clearUserInfo()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast &&
            uni.showToast({
              icon: 'none',
              title: message || '请求错误',
            })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
export const httpGet = <T>(
  url: string,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) => {
  return http<T>({
    url,
    query,
    method: 'GET',
    header,
    ...options,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
    header,
    ...options,
  })
}
/**
 * PUT 请求
 */
export const httpPut = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) => {
  return http<T>({
    url,
    data,
    query,
    method: 'PUT',
    header,
    ...options,
  })
}

/**
 * DELETE 请求（无请求体，仅 query）
 */
export const httpDelete = <T>(
  url: string,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) => {
  return http<T>({
    url,
    query,
    method: 'DELETE',
    header,
    ...options,
  })
}

http.get = httpGet
http.post = httpPost
http.put = httpPut
http.delete = httpDelete
