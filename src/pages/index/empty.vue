<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>
<template>
  <view>
    <wd-navbar
      fixed
      placeholder
      :title="title"
      @click-left="handleClickLeft"
      left-arrow
      safeAreaInsetTop
    ></wd-navbar>
    <wd-status-tip image="content" tip="功能升级中，敬请期待" />
  </view>
</template>
<script lang="ts" setup>
const title = ref('')

const handleClickLeft = () => {
  uni.navigateBack()
}

onLoad((options) => {
  let name = options.title || ''
  title.value = name
})
</script>
