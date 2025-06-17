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
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6872d5e6dab7aeaf51801ce2f50b3f930feb74a7db8cb1f44e21ba7bcf65165f"
            />
            <text class="text-group_1">创始人预约</text>
          </view>
          <view class="image-text_2 flex-col">
            <image
              class="thumbnail_2"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng9048819313ee81c33fa4e99f0bb1c5d0ae2d98fcbcd8eddcc130ddf4a63e637d"
            />
            <text class="text-group_2">创始人茶话会</text>
          </view>
          <view class="image-text_3 flex-col">
            <image
              class="thumbnail_3"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2922607b998c75737e52d2ac2532b668d15a38ace0b0c3f5da0a1e2641c185b8"
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
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb7c70f47133bd0723c6a4ec1e2c0b746a52d632d7c63fd5b35704d8581699c69"
            />
            <text class="text-group_4">服务订单</text>
          </view>
          <view class="image-text_5 flex-col">
            <image
              class="thumbnail_5"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng61ec98bc78fd3241ea919e9d76251670391b3e2548208f5d612c57219fdcbe6b"
            />
            <text class="text-group_5">商品订单</text>
          </view>
          <view class="image-text_6 flex-col" @click="handleGoOrgPage">
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng18c72a801ed66283d2547e40c45eb8bff7b1746d3ffa505f510c6b8942341899"
            />
            <text class="text-group_6">我的组织</text>
          </view>
          <view class="image-text_7 flex-col">
            <image
              class="thumbnail_6"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf945e6618cf88303a930ef16d83ed83f7043a7c021921459e7c6fc0c3972d0b4"
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
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng71e9bb358959647c87304d766685732440ce54ba7c7c04cce25285547c2e92ac"
              />
              <text class="text-group_8">申请入驻</text>
            </view>
            <view class="image-text_9 flex-col">
              <image
                class="thumbnail_8"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc81937f073b307c835c34902a6ec675b3821abec0f7b1edcc1d805311e622fdc"
              />
              <text class="text-group_9">我的需求</text>
            </view>
            <view class="image-text_10 flex-col">
              <image
                class="thumbnail_9"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng0663cb4e0c2fc025800b17a0d5235912e5d04d9e6f8062f748b3d6eb6cef2488"
              />
              <text class="text-group_10">推手中心</text>
            </view>
            <view class="image-text_11 flex-col">
              <image
                class="thumbnail_10"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b3879adcbf7f3116c3cd797815a43e83c1d60e73f7e65f7e45ea4a00a863bb3"
              />
              <text class="text-group_11">下载报告</text>
            </view>
          </view>
          <view class="group_3 flex-row justify-between">
            <view class="image-text_12 flex-col">
              <image
                class="image_4"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4bfaf6339873ebd9b8d55782cd7a78dd98f86e6eb1f2c2fffe2800a0ae17395e"
              />
              <text class="text-group_12">设置</text>
            </view>
            <view class="image-text_13 flex-col">
              <image
                class="thumbnail_11"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngce60259e73490da3a9f7fb964c4c5208dd7edda3a4e6d6937ae6ca3983a2a767"
              />
              <text class="text-group_13">官方客服</text>
            </view>
          </view>
        </view>
      </view>
      <view class="group_5 flex-col">
        <view class="group_6 flex-row"></view>
        <view class="group_7 flex-row">
          <image class="image_7" referrerpolicy="no-referrer" :src="userInfo.avatar" />
          <view class="block_2 flex-col">
            <text class="text_3">可乐</text>
            <view class="image-text_18 flex-row justify-between">
              <image class="thumbnail_18" referrerpolicy="no-referrer" :src="userInfo.avatar" />
              <text class="text-group_18">中国移动四川有限公司</text>
            </view>
          </view>
          <image
            class="thumbnail_19"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga30aec6d5b5737b65ae7a427ce38ca46b097f5bf864ed821fbf2e16124b53078"
          />
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

onShow((options) => {
  hasLogin.value = !!uni.getStorageSync('token')
  console.log('个人中心onShow', hasLogin.value, options)

  hasLogin.value && useUserStore().getUserInfo()
})

const handleGoOrgPage = () => {
  uni.navigateTo({ url: '/pages/mine/org/index' })
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
const getUserInfo = (e: any) => {
  console.log(e.detail)
}
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
