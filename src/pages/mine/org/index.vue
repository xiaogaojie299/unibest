<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的组织',
  },
}
</route>
<template>
  <div class="">
    <div class="px-4 py-2 pb-safe border-b-1 border-gray-200">
      <scroll-view :scroll-y="true" class="scroll-Y">
        <view v-for="item in 10" class="mt-3">
          <OrgCard />
        </view>
      </scroll-view>
      <view class="text-center mt-2">
        <wd-button
          type="primary"
          icon="add-circle"
          block
          custom-class="custom-shadow"
          @click="handleGoPageAddOrg"
        >
          添加组织
        </wd-button>
      </view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import OrgCard from './components/OrgCard.vue'
import { http } from '@/utils/http'

const getList = () => {
  http.post('/program/org/get-user-org').then((res) => {
    console.log(res)
  })
}

const handleGoPageAddOrg = () => {
  uni.navigateTo({
    url: '/pages/mine/org/add',
  })
}
onLoad(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.scroll-Y {
  height: calc(100vh - 200rpx);
  padding-bottom: 10rpx;
}
</style>
