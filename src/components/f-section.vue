<template>
  <div>
    <view class="flex items-center">
      <view class="line mr-2"></view>
      <text lines="1" class="text-1">
        <slot></slot>
      </text>
    </view>
  </div>
</template>
<style lang="scss" scoped>
.line {
  background-color: rgba(255, 186, 0, 1);
  border-radius: 3px;
  width: 4px;
  height: 15px;
}

.text-1 {
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  line-height: 22px;
}
</style>
