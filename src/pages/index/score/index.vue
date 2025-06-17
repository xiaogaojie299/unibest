<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '创新积分',
  },
}
</route>
<template>
  <view class="page-score">
    <wd-navbar
      title=""
      left-text=""
      left-arrow
      :bordered="false"
      custom-style="background-color: #cfcaa0 !important; border: none !important;"
      @click-left="handleClickLeft"
    ></wd-navbar>
    <view class="header px-3">
      <!-- 头像和标签 -->
      <view class="flex items-center pt-[40rpx] mb-5">
        <view>
          <wd-img width="120rpx" height="120rpx" round />
        </view>
        <!-- 标签 -->
        <view class="ml-2">
          <view class="font-weight mb-1">成都CCCC有限公司</view>
          <view>
            <wd-tag class="mr-1" plain>标签</wd-tag>
          </view>
        </view>
      </view>
      <view class="textc-center text-white flex flex-col items-center justify-center">
        <view class="font-weight font-size-10">94.3</view>
        <view class="font-size-3">创新积分</view>
      </view>
    </view>
    <view class="page-theme-bg px-3 py-2 main">
      <h3 class="my-3">积分应用场景</h3>
      <view>
        <wd-cell title="查看创新发展报告" is-link @click="confirm"></wd-cell>
        <view class="mb-3"></view>
        <wd-cell title="匹配科技金融产品" is-link @click="alert"></wd-cell>
        <view class="mb-3"></view>
        <wd-cell title="匹配科技支持政策" is-link @click="alert"></wd-cell>
        <view class="mb-3"></view>
        <wd-cell title="加入创始人俱乐部" is-link @click="alert"></wd-cell>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { http } from '@/utils/http'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'

// 使用storeToRefs解构userInfo
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const message = useMessage()

function alert() {
  message.alert({
    msg: '功能升级中，敬请期待',
    title: '',
  })
}
function confirm() {
  message
    .confirm({
      msg: '',
      title: '组织没有完善相关信息',
      confirmButtonText: '完善组织信息',
      cancelButtonText: '取消',
    })
    .then(() => {
      console.log('点击了确定按钮')
      uni.navigateTo({
        url: '/pages/index/prefect-org/index',
      })
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}

const handleClickLeft = () => {
  uni.navigateBack()
}

const initData = () => {
  console.log('initData', userInfo)
  http.post('/program/score/init', {
    orgId: 0,
  })
}

onLoad(() => {
  initData()
})
</script>
<style lang="scss" scoped>
.page-score {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  height: 408rpx;
  background: #cfcaa0;
}
.main {
  flex: 1;
  box-sizing: border-box;
}
</style>
