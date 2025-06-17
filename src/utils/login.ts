export const tokenKey = 'CACHE_XINDUKECHUANG_TOKEN'

export const getTokenKey = () => {
  return tokenKey
}
export const getToken = () => {
  return 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAsInVzZXJfa2V5IjoiYjFhODNkMjktZGRjMi00OWI4LWJjMGEtMWNlYzQzMDBkNDA4IiwidXNlcm5hbWUiOiIxODMyODUxMDM2MiJ9.ErzPj3Z5dCzFOyumt7quD8GInvCVfI6nU0SkkUzLkSLYouC6hYnClmxPEhQCZaKvYtc1dRpdN2MRYuHrNlPoGA'
  // return uni.getStorageSync(tokenKey)
}
export const setToken = (token: string) => {
  uni.setStorageSync('CACHE_XINDUKECHUANG_TOKEN', token)
}
