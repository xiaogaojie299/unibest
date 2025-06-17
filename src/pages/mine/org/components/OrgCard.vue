<template>
  <view class="org-card-container">
    <!--  -->
    <view class="flex justify-between items-center py-3 px-2">
      <view class="flex items-center">
        <wd-icon name="add-circle" />
        <view class="title ml-2">中国移动四川有限公司</view>
      </view>
      <view>
        <view class="flex items-center">
          <wd-icon name="add-circle" />
          <view class="title ml-2">主组织</view>
        </view>
      </view>
    </view>
    <!-- 下划线 -->
    <view class="divider"></view>
    <view class="flex items-center px-2 pt-2 py-4">
      <view style="border: 1px solid red">
        <wd-img width="115rpx" height="115rpx" round class="border" />
      </view>

      <view class="ml-2">
        <view class="title font-bold mb-2" style="font-size: 32rpx">李四</view>
        <view class="sub-title">总经理</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.org-card-container {
  background: #ffffff;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(209, 209, 209, 0.5);
  border-radius: 19rpx;
}
.divider {
  height: 2rpx;
  background: rgba(209, 209, 209, 0.5);
}
.title {
  font-size: 23rpx;
  color: #0b0b0b;
  line-height: 23rpx;
  text-shadow: 0px 4px 8px rgba(209, 209, 209, 0.5);
}
.sub-title {
  font-weight: 400;
  font-size: 23rpx;
  color: #d1d1d1;
}
</style>
