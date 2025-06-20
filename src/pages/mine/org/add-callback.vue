<route lang="json5">
{
  style: {
    navigationBarTitleText: '已提交',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view>
    <wd-navbar
      fixed
      placeholder
      title="认证组织"
      @click-left="handleClickLeft"
      left-arrow
      safeAreaInsetTop
    ></wd-navbar>
    <view class="flex-col justify-center align-center pt-[360rpx]">
      <!-- <image
        class="label_1"
        referrerpolicy="no-referrer"
        src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng026a50e9bccd4c0e278042b034aae2a4defaea936231b6f4c0d49fa8c7bdb248"
      /> -->
      <wd-icon name="check-circle-filled" size="52px" color="#34d19d"></wd-icon>
      <view class="flex-col justify-center">
        <text class="text_3 mt-3">资料提交成功</text>
        <text class="text_4 text-center">我们已收到您提交的信息，将会尽快为您审核</text>
      </view>
      <view class="mt-8">
        <wd-button type="primary" block round @click="goDetail">查看信息</wd-button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const handleClickLeft = () => {
  uni.navigateBack()
}

const goDetail = () => {
  // uni.navigateTo({
  //   url: '/pages/mine/org/index',
  // })
  uni.redirectTo({
    url: '/pages/mine/org/add',
  })
}
</script>
<style lang="scss" scoped>
@import '../../../style/common.css';

.image-text_1 {
}
.label_1 {
  width: 40px;
  height: 40px;
  align-self: center;
}
.text-group_1 {
  margin-top: 20px;
}
.text_3 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
  align-self: center;
}
.text_4 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  white-space: nowrap;
  line-height: 22px;
  margin-top: 8px;
}
</style>
