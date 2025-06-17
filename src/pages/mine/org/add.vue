<route lang="json5">
{
  style: {
    navigationBarTitleText: '查找组织',
  },
}
</route>
<template>
  <view class="page-container">
    <view class="bg-white">
      <h4 class="mb-2 px-4">你所在的组织名称</h4>
      <wd-search v-model="serchKey" placeholder-left placeholder="你所在的组织名称">
        <template #suffix>
          <view class="px-4">
            <wd-button :round="false" type="primary" size="small">查询</wd-button>
          </view>
        </template>
      </wd-search>
    </view>
    <view class="px-4">
      <view class="my-3 font-size-3">找到35个相关结果</view>
      <view>
        <view v-for="item in 2">
          <wd-card title="" type="rectangle">
            <view class="py-4">
              <view class="flex items-center">
                <wd-img width="114rpx" height="114rpx" class="mr-4"></wd-img>
                <view>
                  <view class="mb-2 font-weight font-size-4 !text-black">新都科创大楼</view>
                  <view>所在园区：晶融汇</view>
                </view>
              </view>
              <view class="text-center mt-3">
                <wd-button type="primary" block>去认证</wd-button>
              </view>
            </view>
          </wd-card>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'

const serchKey = ref('')
const orgList = ref([])
const getAllOrgList = () => {
  http
    .post('/program/org/get-all-org', {
      orgId: 0,
    })
    .then((res) => {
      orgList.value = res.data
    })
}
const initData = () => {
  getAllOrgList()
}
onLoad(() => {
  initData()
})
</script>
