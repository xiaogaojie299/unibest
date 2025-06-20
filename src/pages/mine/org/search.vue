<route lang="json5">
{
  style: {
    navigationBarTitleText: '查找组织',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="page-container">
    <wd-navbar
      fixed
      placeholder
      title="查找组织"
      @click-left="handleClickLeft"
      left-arrow
      safeAreaInsetTop
    ></wd-navbar>

    <view class="bg-white">
      <h5 class="mt-2 px-4">你所在的组织名称</h5>
      <wd-search v-model="serchKey" focus placeholder-left placeholder="你所在的组织名称">
        <template #suffix>
          <view class="px-4">
            <wd-button :round="false" type="primary" size="small" @click="initData">查询</wd-button>
          </view>
        </template>
      </wd-search>
    </view>
    <view class="px-4">
      <view class="my-3 font-size-3">找到{{ orgList?.length || 0 }}个相关结果</view>
      <view v-if="orgList?.length > 0">
        <view v-for="item in orgList" :key="item.id">
          <view class="bg-white mb-4 rounded-lg px-4">
            <view class="py-4">
              <view class="flex items-center">
                <wd-img width="114rpx" height="114rpx" class="mr-4"></wd-img>
                <view>
                  <view class="mb-2 font-bold font-size-4 !text-black">
                    {{ item.name || '-' }}
                  </view>
                  <view class="text-sm text-gray">所在园区：{{ item.parkNames || '-' }}</view>
                </view>
              </view>
              <view class="text-center mt-3">
                <wd-button type="primary" block @click="handleClick(item)">去认证</wd-button>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else>
        <wd-status-tip image="content" tip="暂无内容" />
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'

const serchKey = ref('')
const orgList = ref([])
const parkId = computed(() => uni.getStorageSync('CACHE_PARKID'))
const getAllOrgList = () => {
  http
    .post('/program/org/get-all-org', {
      name: serchKey.value,
      parkId: parkId.value,
    })
    .then((res) => {
      orgList.value = res.data
    })
}

// 去认证
const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/mine/org/join?id=${item.id}&name=${item.name}&pageType=search`,
  })
}

const handleClickLeft = () => {
  uni.redirectTo({
    url: '/pages/mine/org/index',
  })
}

const initData = () => {
  getAllOrgList()
}
onLoad(() => {
  initData()
})
</script>

<style lang="scss" scoped>
::v-deep {
  .wd-card.is-rectangle .wd-card__content::after {
    display: none !important;
  }
}
</style>
