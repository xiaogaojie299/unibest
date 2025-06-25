<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="page flex-col">
    <view class="box_1 flex-row">
      <view class="group_1 flex-col">
        <view class="section_1 flex-row">
          <view class="image-text_1 flex-col">
            <image
              class="thumbnail_1"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/chuangshiren.png"
            />
            <text class="text-group_1">创始人预约</text>
          </view>
          <view class="image-text_2 flex-col">
            <image
              class="thumbnail_2"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/chahuahui.png"
            />
            <text class="text-group_2">创始人茶话会</text>
          </view>
          <view class="image-text_3 flex-col">
            <image
              class="thumbnail_3"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/youzhipintaifuwu.png"
            />
            <text class="text-group_3">优质平台服务</text>
          </view>
        </view>
        <view class="text-wrapper_1 flex-col">
          <text class="text_1">我的</text>
        </view>
        <image
          class="image_2"
          referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1058917598cb891eb21d1ebc6ebddd74433e5ba7c997ae5b36ff5f2f05c69eeb"
        />
        <view class="section_2 flex-row justify-between">
          <view class="image-text_4 flex-col">
            <image
              class="thumbnail_4"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/fuwudingdan.png"
            />
            <text class="text-group_4">服务订单</text>
          </view>
          <view class="image-text_5 flex-col">
            <image
              class="thumbnail_5"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/shangpingdingdan.png"
            />
            <text class="text-group_5">商品订单</text>
          </view>
          <view class="image-text_6 flex-col" @click="handleGoOrgPage">
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/wodezuzhi.png"
            />
            <text class="text-group_6">我的组织</text>
          </view>
          <view class="image-text_7 flex-col">
            <image
              class="thumbnail_6"
              referrerpolicy="no-referrer"
              src="@/static/images/mine/wodeyuyue.png"
            />
            <text class="text-group_7">我的预约</text>
          </view>
        </view>
        <view class="section_3 flex-col">
          <view class="group_2 flex-row justify-between">
            <view class="image-text_8 flex-col">
              <image
                class="thumbnail_7"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/shengqingruzhu.png"
              />
              <text class="text-group_8">申请入驻</text>
            </view>
            <view class="image-text_9 flex-col">
              <image
                class="thumbnail_8"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/wodexuqiu.png"
              />
              <text class="text-group_9">我的需求</text>
            </view>
            <view class="image-text_10 flex-col">
              <image
                class="thumbnail_9"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/tuishouzhongxing.png"
              />
              <text class="text-group_10">推手中心</text>
            </view>
            <view class="image-text_11 flex-col">
              <image
                class="thumbnail_10"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/xiazaibaogao.png"
              />
              <text class="text-group_11">下载报告</text>
            </view>
          </view>
          <view class="group_3 flex-row justify-between">
            <view class="image-text_12 flex-col">
              <image
                class="image_4"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/shezhi.png"
              />
              <text class="text-group_12">设置</text>
            </view>
            <view class="image-text_13 flex-col">
              <image
                class="thumbnail_11"
                referrerpolicy="no-referrer"
                src="@/static/images/mine/guanfangkefu.png"
              />
              <text class="text-group_13">官方客服</text>
            </view>
          </view>
        </view>
      </view>
      <view class="group_5 flex-col">
        <view class="group_6 flex-row"></view>
        <view
          class="group_7 mt-4 flex items-center justify-between w-full px-10"
          @click="handleGoEditUserInfo"
        >
          <view class="flex items-center">
            <image
              class="image_7"
              referrerpolicy="no-referrer"
              :src="userInfo.avatar || '@/static/images/default-avatar.png'"
            />
            <view class="block_2 flex-col">
              <text class="text_3">{{ userInfo.nickname || '-' }}</text>
              <view class="image-text_18 flex-row" @click.stop="handleGoOrgPage">
                <image
                  class="thumbnail_18 mr-2"
                  referrerpolicy="no-referrer"
                  :src="userInfo.avatar"
                />
                <text class="text-group_18">{{ userInfo.orgName || '-' }}</text>
              </view>
            </view>
          </view>
          <view>
            <wd-icon name="arrow-right" size="22px"></wd-icon>
          </view>
        </view>
        <view class="text-wrapper_2 flex-row justify-between">
          <text class="text_4">企业家俱乐部</text>
          <text class="text_5">开通VIP，加入企业家俱乐部</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { useToast } from 'wot-design-uni'
import { useUpload } from '@/utils/uploadFile'
import { storeToRefs } from 'pinia'
import { IUploadSuccessInfo } from '@/api/login.typings'

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)
const toast = useToast()
const hasLogin = ref(false)
const token = computed(() => useUserStore()?.userToken)

onShow((options) => {
  getUserInfo()
})

const getUserInfo = () => {
  if (!token.value) return
  userStore.getUserInfo()
}

const handleGoOrgPage = () => {
  uni.navigateTo({ url: '/pages/mine/org/index' })
}
const handleGoEditUserInfo = () => {
  uni.navigateTo({ url: '/pages/mine/edit-user-info' })
}

const handleDetail = () => {
  uni.navigateTo({
    url: `/pages/mine/org/detail?orgId=${userStore?.userInfo.orgId}`,
  })
}
// #ifndef MP-WEIXIN
// 上传头像
const { run } = useUpload<IUploadSuccessInfo>(
  import.meta.env.VITE_UPLOAD_BASEURL,
  {},
  {
    onSuccess: (res) => {
      console.log('h5头像上传成功', res)
      useUserStore().setUserAvatar(res.url)
    },
  },
)
// #endif

// 微信小程序下登录
const handleLogin = async () => {
  // #ifdef MP-WEIXIN

  // 微信登录
  await userStore.wxLogin()
  hasLogin.value = true
  // #endif
  // #ifndef MP-WEIXIN
  uni.navigateTo({ url: '/pages/login/index' })
  // #endif
}

// #ifdef MP-WEIXIN

// 微信小程序下选择头像事件
const onChooseAvatar = (e: any) => {
  console.log('选择头像', e.detail)
  const { avatarUrl } = e.detail
  const { run } = useUpload<IUploadSuccessInfo>(
    import.meta.env.VITE_UPLOAD_BASEURL,
    {},
    {
      onSuccess: (res) => {
        console.log('wx头像上传成功', res)
        useUserStore().setUserAvatar(res.url)
      },
    },
    avatarUrl,
  )
  run()
}
// #endif
// #ifdef MP-WEIXIN
// 微信小程序下设置用户名
// #endif

// 个人资料
const handleProfileInfo = () => {
  uni.navigateTo({ url: `/pages/mine/info/index` })
}
// 账号安全
const handlePassword = () => {
  uni.navigateTo({ url: `/pages/mine/password/index` })
}
// 消息通知
const handleInform = () => {
  // uni.navigateTo({ url: `/pages/mine/inform/index` })
  toast.show('功能开发中')
}
// 应用更新
const handleAppUpdate = () => {
  // #ifdef MP
  // #ifndef MP-HARMONY
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    // console.log(res.hasUpdate)
    if (res.hasUpdate) {
      toast.show('检测到新版本，正在下载中...')
    } else {
      toast.show('已是最新版本')
    }
  })
  updateManager.onUpdateReady(function (res) {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed(function (res) {
    // 新的版本下载失败
    toast.error('新版本下载失败')
  })
  // #endif
  // #endif

  // #ifndef MP
  toast.show('功能开发中')
  // #endif
}
// 关于我们
const handleAbout = () => {
  uni.navigateTo({ url: `/pages/mine/about/index` })
}
// 清除缓存
const handleClearCache = () => {
  uni.showModal({
    title: '清除缓存',
    content: '确定要清除所有缓存吗？\n清除后需要重新登录',
    success: (res) => {
      if (res.confirm) {
        try {
          // 清除所有缓存
          uni.clearStorageSync()
          // 清除用户信息并跳转到登录页
          useUserStore().logout()
          toast.show('清除缓存成功')
        } catch (err) {
          console.error('清除缓存失败:', err)
          toast.error('清除缓存失败')
        }
      }
    },
  })
}
// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useUserStore().logout()
        hasLogin.value = false
        // 执行退出登录逻辑
        toast.show('退出登录成功')
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        // uni.reLaunch({ url: '/pages/login/index' })
        // #endif
      }
    },
  })
}
</script>

<style lang="scss" scoped>
@import './style/common.css';
@import './style/index.rpx.css';
</style>
