<template>
  <view class="org-card-container">
    <!--  -->
    <view class="flex justify-between items-center py-3 px-4">
      <view class="flex items-center">
        <wd-icon name="subscribe" color="var(--wot-color-theme)"></wd-icon>
        <view class="title ml-2 ellipsis w-[320rpx]">
          {{ info?.name || '-' }}
        </view>
      </view>
      <view>
        <view class="flex items-center" @click.stop="emits('changeMainOrg', info)">
          <wd-icon
            v-if="info.mainOrg == 1"
            name="check-circle-filled"
            size="22px"
            color="#CFCAA0"
          ></wd-icon>
          <wd-icon name="circle1" size="22px" v-else></wd-icon>
          <view class="title ml-1">{{ info.mainOrg == 1 ? '主组织' : '设置为主组织' }}</view>
        </view>
      </view>
    </view>
    <!-- 下划线 -->
    <view class="divider"></view>
    <view class="flex items-center px-2 pt-2 py-4">
      <view calass="bg-gray-300 w-[115rpx] h-[115rpx] ">
        <wd-img width="115rpx" height="115rpx" round :src="info.avatarUrl" />
      </view>

      <view class="ml-2 flex items-center justify-between flex-grow-1">
        <view>
          <view class="title font-bold mb-2" style="font-size: 32rpx">
            {{ info?.nickName || '-' }}
          </view>
          <view class="sub-title">{{ info.positionName || '-' }}</view>
        </view>
        <view class="pr-2">
          <text class="text-gray-500 text-xs">创新积分：{{ info.score || '-' }}</text>
          <view class="text-sm mt-2" :class="{ 'text-red': !!info.status }">
            {{ statusMap[info.status] }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
// 状态（状态(0正常 1停用 2审核中 3拒绝)）
const statusMap = {
  0: '',
  1: '停用',
  2: '审核中',
  3: '拒绝',
}
const props = defineProps<{
  info: any
}>()
const emits = defineEmits(['changeMainOrg'])
</script>
<style lang="scss" scoped>
.org-card-container {
  background: #ffffff;
  // box-shadow: 0rpx 4rpx 18rpx 0rpx rgba(209, 209, 209, 0.5);
  border-radius: 19rpx;
  border: 1rpx solid rgba(209, 209, 209, 0.5);
}
.divider {
  height: 2rpx;
  background: rgba(209, 209, 209, 0.5);
}
.title {
  font-size: 30rpx;
  color: #0b0b0b;
  text-shadow: 0px 4px 8px rgba(209, 209, 209, 0.5);
}
.sub-title {
  font-weight: 400;
  font-size: 26rpx;
  color: #d1d1d1;
}
</style>
