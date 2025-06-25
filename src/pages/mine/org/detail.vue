<route lang="json5">
{
  style: {
    navigationBarTitleText: '组织信息',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view>
    <view class="wraper page-theme-bg">
      <wd-navbar
        fixed
        placeholder
        title="组织信息"
        @click-left="handleClickLeft"
        left-arrow
        safeAreaInsetTop
      ></wd-navbar>
      <view class="px-2 py-2">
        <view class="company-card">
          <!-- 公司信息部分 -->
          <view class="company-info flex items-center p-4">
            <image
              class="company-logo"
              src="https://via.placeholder.com/150"
              mode="aspectFill"
            ></image>
            <view class="ml-4 w-full">
              <text class="company-name font-bold">{{ orgDetail.name }}</text>
              <view class="flex mt-2">
                <wd-tag>投资管理</wd-tag>
                <view class="mr-2"></view>
                <wd-tag class="mr-2">资产管理</wd-tag>
                <view class="mr-2"></view>
                <wd-tag class="mr-2">科技创业投资</wd-tag>
              </view>
            </view>
          </view>

          <!-- 分割线 -->
          <view class="h-[1px] w-full bg-gray-200"></view>

          <!-- 个人信息部分 -->
          <view class="personal-info flex items-center p-4">
            <image
              class="avatar rounded-full"
              src="https://via.placeholder.com/100"
              mode="aspectFill"
            ></image>
            <view class="ml-4 w-full">
              <text class="name font-bold" style="font-size: 30rpx !important">
                {{ orgDetail.natureName || '-' }}
              </text>
              <view class="position text-gray-600 mt-1">总经理</view>
            </view>
            <view class="ml-auto w-[300rpx]" @click="goScore">
              <text class="score text-yellow-500">创新积分：{{ orgDetail.score | 0 }} ></text>
            </view>
          </view>
        </view>
      </view>
      <wd-tabs v-model="active" @change="handleChange" sticky :offset-top="200">
        <block v-for="(item, index) in stepList" :key="index">
          <wd-tab :title="item.title">
            <view v-for="(cell, index) in item.items" :key="index"></view>
          </wd-tab>
        </block>
      </wd-tabs>
      <scroll-view
        class="content page-theme-bg px-2 pt-3"
        scroll-y
        scroll-with-animation
        :scroll-top="scrollTop"
        :throttle="false"
        @scroll="onScroll"
      >
        <view v-for="(item, index) in stepList" :key="index" class="category mt-3">
          <view class="cell-group bg-white rounded-lg overflow-hidden">
            <view class="px-2 pt-3">
              <f-section>{{ item.title }}</f-section>
            </view>
            <view class="h-[1px] w-full bg-gray-200 my-2"></view>
            <view>
              <wd-cell v-for="(cell, index) in item.items" :key="index">
                <template #title>
                  <view class="custom-title-class">{{ cell.name }}</view>
                </template>
                {{ cell.submitValue || '-' }}
              </wd-cell>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { onMounted, ref, nextTick } from 'vue'
import { getRect, isArray } from 'wot-design-uni/components/common/util'
import { groupByModuleType, flatten2DArray } from '@/utils/index'

import fSection from '@/components/f-section.vue'

const orgId = ref(undefined)
const active = ref<number>(0)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])
const orgDetail = ref({})

const stepList = ref([
  {
    title: '基础信息',
    items: [],
  },
  {
    title: '技术创新',
    items: [],
  },
  {
    title: '成长经营',
    items: [],
  },
  {
    title: '辅助指标',
    items: [],
  },
  {
    title: '加分指标',
    items: [],
  },
  {
    title: '负面指标',
    items: [],
  },
])

const handleClickLeft = () => {
  uni.navigateBack()
  return
}

const getList = () => {
  return new Promise((resolve, reject) => {
    http.post('/program/score/get-org-index', { orgId: orgId.value || 0 }).then((res) => {
      let resData = res.data.map((v) => {
        return {
          ...v,
          submitValue: v.submitValue || '',
        }
      })
      const processdData = resData
      // 调用函数归类
      const data = groupByModuleType(processdData)
      Object.values(data).map((v, index) => {
        stepList.value[index]['items'] = v
      })
      resolve()
    })
  })
}

// 获取组织详情
const getOrgDetail = () => {
  if (!orgId.value) return

  http.post('/program/org/detail', { id: orgId.value }).then((resp) => {
    orgDetail.value = resp.data
  })
}

const goScore = () => {
  uni.navigateTo({
    url: '/pages/index/score/index',
  })
}

onMounted(async () => {
  await getList()
  nextTick(() => {
    setTimeout(() => {
      getRect('.category', true).then((rects) => {
        if (isArray(rects)) {
          itemScrollTop.value = rects.map((item) => item.top - 375 || 0)
          // scrollTop.value = rects[active.value].top || 0
          scrollTop.value = 0
        }
        console.log('itemScrollTop', itemScrollTop)
      })
    }, 100)
  })
})

function handleChange({ index, name }) {
  console.log(index, name)
  active.value = index
  scrollTop.value = itemScrollTop.value[index]
}
function onScroll(e) {
  //   const { scrollTop } = e.detail
  const scrollTop = e.detail.scrollTop
  console.log('scrollTop', scrollTop)
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex(
    (top) => top > scrollTop && top - scrollTop <= threshold,
  )
  if (index > -1) {
    active.value = index
  }
}

onLoad((options) => {
  orgId.value = options.orgId || undefined
  getOrgDetail()
})
</script>
<style lang="scss" scoped>
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.content {
  box-sizing: border-box;
}
.category {
}
::v-deep(.custom-title-class) {
  font-size: 24rpx !important;
  color: rgba(0, 0, 0, 0.45);
}
::v-deep {
  .wd-cell__wrapper {
    padding: 10rpx 18rpx 10rpx 0;
  }
}

.company-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-info,
.personal-info {
  .avatar {
    width: 115rpx;
    height: 115rpx;
  }
  .company-logo {
    width: 130rpx;
    height: 130rpx;
  }

  .company-name,
  .name {
    color: rgba(0, 0, 0, 0.85);
  }

  .company-name {
    font-size: 30rpx !important;
  }

  .position {
    font-size: 14px;
  }

  .score {
    font-size: 16px;
  }
}
</style>
