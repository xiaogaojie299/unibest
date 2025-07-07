<route lang="json5">
{
  style: {
    navigationBarTitleText: '完善组织信息',
  },
}
</route>

<template>
  <view>
    <view class="flex-col justify-center align-center pt-[260rpx]">
      <wd-icon name="check-circle-filled" size="52px" color="#34d19d"></wd-icon>
      <view class="flex-col justify-center">
        <text class="text_4 text-center">信息提交成功</text>
      </view>
      <view class="mt-8 flex items-center justify-center">
        <wd-button type="info" @click="handleGoHome">返回主页</wd-button>
        <view style="width: 120rpx"></view>
        <wd-button type="primary" @click="handleGoDetail">查看创新积分</wd-button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const orgId = ref('')

const handleGoHome = () => {
  uni.reLaunch({
    url: `/pages/index/index`,
  })
}

const handleGoDetail = () => {
  uni.redirectTo({
    url: `/pages/index/score/index?type=home`,
  })
}
onLoad((options) => {
  orgId.value = options?.orgId
})
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
