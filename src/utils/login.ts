export const tokenKey = 'CACHE_XINDUKECHUANG_TOKEN'

export const getTokenKey = () => {
  return tokenKey
}
export const getToken = () => {
  return 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAsInVzZXJfa2V5IjoiMDcxNzc1ZDQtMmU0Yi00NTMyLTk2MjQtNjkxNTBjMjI4YTA4IiwidXNlcm5hbWUiOiIxODMyODUxMDM2MiJ9.ytQr72vn6Kud2R1XnF9xsluCFysgL0od_3roSzSeRpfAQkCQ74_HsqUAk_iWZLxI-4sMPhwwzZbmPx3fn_t_bg'
}
export const setToken = (token: string) => {
  uni.setStorageSync('CACHE_XINDUKECHUANG_TOKEN', token)
}
