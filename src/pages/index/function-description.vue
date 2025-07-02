<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '功能说明',
  },
}
</route>
<template>
  <div>{{ content }}</div>
</template>

<script lang="ts" setup>
const content = ref('')

onLoad((options) => {
  let remark = options.remark ? decodeURIComponent(options.remark) : ''
  console.log('options', options)
  content.value = remark
})
</script>
