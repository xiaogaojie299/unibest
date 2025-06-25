export const tokenKey = 'CACHE_XINDUKECHUANG_TOKEN'

export const getTokenKey = () => {
  return tokenKey
}
export const getToken = () => {
  return uni.getStorageSync(tokenKey)
}
export const setToken = (token: string) => {
  uni.setStorageSync('CACHE_XINDUKECHUANG_TOKEN', token)
}
