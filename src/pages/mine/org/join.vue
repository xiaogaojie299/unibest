<route lang="json5">
{
  style: {
    navigationBarTitleText: '查找组织',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <div class="page-org-join page-theme-bg">
    <wd-navbar
      fixed
      placeholder
      title="查找组织"
      @click-left="handleClickLeft"
      left-arrow
      safeAreaInsetTop
    ></wd-navbar>
    <view class="px-4 py-2 pb-safe border-b-1 border-gray-200">
      <view class="box_3">
        <view class="section_1 flex items-center mb-4">
          <view class="box_4 mr-2"></view>
          <text lines="1" class="text_3">个人信息</text>
        </view>
        <view class="mt-2">
          <text lines="1" class="text_4">真实姓名</text>
          <view class="mt-2">
            <wd-input clearable v-model="state.realName" placeholder="请输入" />
          </view>
        </view>
        <view class="mt-2">
          <text lines="1" class="text_6">所在企业</text>
          <view
            class="text-wrapper_2 mt-2 flex justify-between items-center"
            @click="goTo(`/pages/mine/org/join-select-org?pageType=${pageType}`)"
          >
            <text class="text_7">{{ !state.orgName ? '请选择' : state.orgName }}</text>
            <wd-icon name="arrow-right" size="22px" color="#bfbfbf"></wd-icon>
          </view>
        </view>
        <view class="mt-2">
          <text lines="1" class="text_6">您的职位</text>
          <view class="mt-2">
            <wd-input clearable placeholder="请输入" v-model="state.positionName" />
          </view>
        </view>
        <view class="mt-2">
          <text lines="1" class="text_6">手机号码</text>
          <view class="mt-2">
            <wd-input clearable v-model="mobile" readonly placeholder="请输入" />
          </view>
        </view>
      </view>
      <view class="flex justify-center mt-4">
        <wd-button type="primary" @click="handleSubmit">立即认证</wd-button>
      </view>
    </view>
  </div>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const mobile = computed(() => userInfo.value?.phonenumber)
const parkId = computed(() => uni.getStorageSync('CACHE_PARKID'))

const state = reactive({
  mobile: '',
  positionName: '',
  realName: '',
  orgName: '',
  orgId: '',
})

const pageType = ref('')

const goTo = (url: string, query?: Record<string, any>) => {
  uni.navigateTo({
    url,
    query,
  })
  uni.setStorageSync('joinFormData', { ...state })
}

const handleClickLeft = () => {
  if (pageType.value === 'search') {
    return uni.redirectTo({
      url: '/pages/mine/org/search',
    })
  }

  if (pageType.value === 'index') {
    return uni.switchTab({
      url: '/pages/index/index',
    })
  }

  uni.redirectTo({
    url: '/pages/mine/org/index',
  })
}

const handleSubmit = () => {
  http
    .post('/program/org/enjoy-org', {
      mobile: mobile.value,
      positionName: state.positionName,
      realName: state.realName,
      orgId: state.orgId,
      parkId: parkId.value,
    })
    .then((resp) => {
      handleClear()
      uni.showToast({
        title: `操作成功`,
        icon: 'none',
      })
      setTimeout(() => {
        uni.navigateTo({
          url: `/pages/mine/org/callback?orgId=${state.orgId}`,
        })
      }, 1000)
    })
}

const handleClear = () => {
  uni.removeStorageSync('joinFormData')
}

onLoad((options) => {
  let orgId = options.id
  let orgName = options.name ? decodeURIComponent(options.name) : ''

  pageType.value = options.pageType || ''

  if (!orgId) {
    handleClear()
  }

  const cached = uni.getStorageSync('joinFormData')

  if (cached) {
    Object.assign(state, cached)
  }

  state.orgName = orgName
  state.orgId = orgId
})
</script>
<style lang="scss" scoped>
@import '../../../style/common.css';

.page-org-join {
  min-height: 100vh;
}
::v-deep {
  .wd-input {
    background-color: transparent;
    background-color: rgba(249, 249, 249, 1) !important;
    border-radius: 6px;
    width: 100%;
    border: none;
    padding: 5px;
  }
  .wd-input::after {
    display: none;
  }
}

.box_3 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  align-self: center;
  margin-top: 13px;
  padding: 9px 12px 21px 7px;
}
.section_1 {
}
.box_4 {
  background-color: rgba(255, 186, 0, 1);
  border-radius: 3px;
  width: 4px;
  height: 15px;
}
.text_3 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}
.text_4 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 18px 287px 0 0;
}
.text-wrapper_1 {
}
.text_5 {
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}
.text_6 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 12px 287px 0 0;
}
.text-wrapper_2 {
  background-color: rgba(249, 249, 249, 1);
  border-radius: 6px;
  margin-top: 10px;
  padding: 13px 5px;
}
.text_7 {
  overflow-wrap: break-word;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}
.text_8 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 12px 287px 0 0;
}
.text-wrapper_3 {
  background-color: rgba(249, 249, 249, 1);
  border-radius: 6px;
  margin-top: 10px;
  padding: 13px 291px 13px 10px;
}
.text_9 {
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}
.text_10 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
  margin: 12px 287px 0 0;
}
.text-wrapper_4 {
  background-color: rgba(249, 249, 249, 1);
  border-radius: 6px;
  margin-top: 10px;
  padding: 13px 291px 13px 10px;
}
.text_11 {
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}
</style>
