<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的组织',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <div class="page-org-index">
    <wd-navbar
      fixed
      placeholder
      title="认证组织"
      @click-left="handleClickLeft"
      left-arrow
      safeAreaInsetTop
    ></wd-navbar>
    <view class="mt-2"></view>
    <OrgSearch @focus="onfocus" api="/program/org/get-user-org" @search="handleSearch"></OrgSearch>
    <scroll-view :scroll-y="true" class="scroll-Y px-4 py-2 pb-safe page-theme-bg">
      <view v-if="orgList.length > 0">
        <view v-for="item in orgList" :key="item.orgId" class="mt-3">
          <wd-swipe-action :disabled="item.status !== 3">
            <view @click="handleClickOrgCard(item)">
              <OrgCard :info="item" @changeMainOrg="handleChangeMainOrg" />
            </view>
            <template #right>
              <view class="action">
                <view
                  class="button"
                  style="background: rgb(250, 67, 80)"
                  @click.stop="handleDelete(item.orgId)"
                >
                  删除
                </view>
              </view>
            </template>
          </wd-swipe-action>
        </view>
      </view>
      <view v-else>
        <wd-status-tip image="content" tip="暂无内容" />
      </view>
    </scroll-view>
    <view class="text-center mt-2 footer-btn footer px-2">
      <wd-button type="text" @click="handleGoJoinOrg">加入其他组织</wd-button>
      <view></view>
      <wd-button
        type="primary"
        icon="add-circle"
        block
        custom-class="custom-shadow"
        @click="handleConfirmChangeMainOrg"
      >
        确认切换
      </wd-button>
    </view>
  </div>
</template>
<script lang="ts" setup>
import OrgCard from './components/OrgCard.vue'
import OrgSearch from './components/OrgSearch.vue'
import { useUserStore } from '@/store'
import { http } from '@/utils/http'

const userStore = useUserStore()

const orgList = ref([])

const handleSearch = (data) => {
  orgList.value = data
}
const getList = () => {
  http.post('/program/org/get-user-org').then((res) => {
    orgList.value = res.data
  })
}

const onfocus = () => {
  uni.navigateTo({
    url: '/pages/mine/org/search',
  })
}

const handleDelete = (id) => {
  if (!id) return
  http.post('/program/org/del-enjoy-org', { orgId: id }).then(() => {
    getList()
  })
}

const handleClickLeft = () => {
  uni.switchTab({
    url: '/pages/mine/index',
  })
}

const handleGoPageAddOrg = () => {
  uni.navigateTo({
    url: '/pages/mine/org/add',
  })
}

const handleGoJoinOrg = () => {
  uni.navigateTo({
    url: '/pages/mine/org/join',
  })
}

const handleEditOrg = (id) => {
  uni.navigateTo({
    url: `/pages/mine/org/add?orgId=${id}`,
  })
}

const handleClickOrgCard = (item) => {
  // 则跳转到详情
  if (item.status == 0 && item.orgId) {
    uni.navigateTo({
      url: `/pages/mine/org/detail?orgId=${item.orgId}`,
    })
    return
  }

  // handleEditOrg(item.orgId)
}

const handleChangeMainOrg = (info) => {
  if (!info.orgId || info.orgId === 'null') {
    return uni.showToast({ title: '组织ID不能为null', icon: 'none' })
  }

  let list = orgList.value
  let index = list.findIndex((item) => item.orgId == info.orgId)

  if (index > -1) {
    list = list.map((v) => {
      return { ...v, mainOrg: 0 }
    })

    list[index]['mainOrg'] = 1
    orgList.value = list
  }
}

const handleConfirmChangeMainOrg = () => {
  let list = orgList.value
  let find = list.find((v) => v.mainOrg === 1)

  http.post('/program/org/set-main-org', { id: find.orgId }).then((resp) => {
    uni.showToast({ title: '设置主组织成功', icon: 'none' })
    getList()
    userStore.getUserInfo()
  })
}

onShow(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.page-org-index {
  display: flex;
  flex-direction: column;

  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
.footer {
  height: 120rpx;
}
.scroll-Y {
  // height: calc(100vh - 240rpx);
  flex: 1;
  padding-bottom: 10rpx;
  box-sizing: border-box;
}
.action {
  height: 100%;
}
.button {
  display: inline-block;
  padding: 0 11px;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
