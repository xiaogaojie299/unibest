<template>
  <view class="park-card bg-white">
    <view class="group_2">
      <image width="" :src="info.logoUrl"></image>
    </view>
    <view class="section_4">
      <view class="image-text_3">
        <view class="box_4">
          <image :src="info.logoUrl"></image>
        </view>
        <view class="text-group_3 ml-3">
          <text lines="1" class="text_4">{{ info.name }}</text>
          <text lines="1" class="text_5">{{ info.regionRelationName }}</text>
        </view>
      </view>
      <text lines="1" class="text_6">{{ info.distabce || '-' }}km</text>
    </view>
  </view>
</template>
<script lang="ts" setup>
const props = defineProps<{
  info: () => {}
}>()
</script>
<style lang="scss" scoped>
uni-image {
  width: 100%;
}
.section_4 {
  border-radius: 19rpx;
  position: relative;
  align-self: center;
  margin-top: -2rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  padding: 23rpx 31rpx 19rpx 13rpx;
}
.image-text_3 {
  flex-direction: row;
  display: flex;
}
.box_4 {
  background-color: rgba(216, 216, 216, 1);
  border-radius: 12rpx;
  width: 85rpx;
  height: 85rpx;
  display: flex;
  flex-direction: column;
}
.text-group_3 {
  margin-bottom: 19rpx;
  display: flex;
  flex-direction: column;
}
-text_4 {
  width: 381rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
}
.text_5 {
  overflow-wrap: break-word; // 允许长单词或 URL 换行
  white-space: pre-wrap; // 保留空格和换行符，支持自动换行
  word-break: break-all; // 兼容性补充，强制换行
  color: rgba(0, 0, 0, 1);
  font-size: 23rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  margin-top: 8rpx;
  width: 400rpx;
}
.text_6 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 23rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 19rpx;
  margin-top: 46rpx;
}
.group_2 {
  height: 254rpx;
  display: flex;
  flex-direction: column;
}
</style>
