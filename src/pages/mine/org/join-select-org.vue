<route lang="json5">
{
  style: {
    navigationBarTitleText: '选择组织',
  },
}
</route>
<template>
  <div class="page-theme-bg page-join-org">
    <OrgSearch @search="onSearch"></OrgSearch>
    <view class="px-4">
      <view class="my-3 font-size-3">找到{{ orgList?.length }}个相关结果</view>
      <view v-if="orgList?.length > 0">
        <view
          v-for="item in orgList"
          :key="item.id"
          class="py-3 px-4 flex justify-between items-center bg-white mb-3 rounded-lg"
          @click="onClick(item)"
        >
          <view class="flex items-center">
            <view class="w-[115rpx] h-[115rpx] rounded bg-gray-300 left-img"></view>
            <view class="ml-2">
              <view class="font-bold font-size-4">{{ item.name }}</view>
              <view class="text-gray-500 text-sm mt-2">所在空间载体：{{ item.parkNames }}</view>
            </view>
          </view>
          <view>
            <wd-icon
              v-if="item.id == selectItem.id"
              name="check-circle-filled"
              size="22px"
              color="#CFCAA0"
            ></wd-icon>
            <wd-icon name="circle1" size="22px" v-else></wd-icon>
          </view>
        </view>
      </view>
      <template v-else>
        <wd-status-tip image="content" tip="没有找到您的组织？" />
        <view class="footer-btn footer">
          <wd-button type="primary" icon="add-circle" block round @click="handleGoPageAddOrg">
            添加组织
          </wd-button>
        </view>
      </template>
    </view>
  </div>
</template>
<script lang="ts" setup>
import OrgSearch from './components/OrgSearch.vue'
import { toQueryString } from '@/utils/index'
import { http } from '@/utils/http'

const orgList = ref([])
const selectItem = ref({ id: '' })
const pageQuery = ref({})
const onClick = (item) => {
  selectItem.value = item
  let params = {
    id: item.id,
    name: item.name,
    ...pageQuery.value,
  }

  uni.redirectTo({
    url: `/pages/mine/org/join?${toQueryString(params)}`,
  })
}

const handleGoPageAddOrg = () => {
  // http.post('/program/org/add-org-init').then((resp) => {
  //   if (!resp.data) {
  //     return uni.navigateTo({
  //       url: '/pages/mine/org/add',
  //     })
  //   }
  // })
  return uni.navigateTo({
    url: '/pages/mine/org/add',
  })
}

const onSearch = (list) => {
  orgList.value = list || []
}

onLoad((options) => {
  pageQuery.value = options
})
</script>
<style lang="scss" scoped>
.page-join-org {
  min-height: 100vh;
  .left-img {
    flex-shrink: 0;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
</style>
