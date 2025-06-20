<route lang="json5">
{
  style: {
    navigationBarTitleText: '完善组织信息',
  },
}
</route>
<template>
  <view class="page-prefect-org page-theme-bg">
    <view class="header bg-white">
      <wd-steps :active="active" align-center>
        <wd-step v-for="(item, idx) in stepList" :key="idx" :title="item.title" description="" />
      </wd-steps>
    </view>
    <!-- 主图部分 -->
    <view class="main">
      <scroll-view :scroll-y="true" style="height: calc(100vh - 56px - 100rpx - 100rpx)">
        <wd-cell-group :border="false">
          <view v-for="(item, index) in groupedData[active]" :key="item.id">
            <view v-if="[4, 5].includes(active)">
              <!-- 真的恼火  -->
              <view v-if="[44, 45, 46].includes(item.configKey)">
                <view v-if="item.configKey === 44">
                  <wd-cell :title="item.label" required vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入获得金牌数量"
                      no-border
                    />
                  </wd-cell>
                </view>
                <view v-if="item.configKey === 45">
                  <wd-cell vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入获得银牌数量"
                      no-border
                    />
                  </wd-cell>
                </view>
                <view v-if="item.configKey === 46">
                  <wd-cell vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入获得铜牌数量"
                      no-border
                    />
                  </wd-cell>
                </view>
              </view>

              <view v-else-if="[47, 48, 49].includes(item.configKey)">
                <view v-if="item.configKey === 47">
                  <wd-cell :title="item.label" required vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入一等奖以及以上获奖次数"
                      no-border
                    />
                  </wd-cell>
                </view>
                <view v-if="item.configKey === 48">
                  <wd-cell vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入二等奖次数"
                      no-border
                    />
                  </wd-cell>
                </view>
                <view v-if="item.configKey === 49">
                  <wd-cell vertical>
                    <wd-input
                      clearable
                      v-model="item.submitValue"
                      border
                      placeholder="请输入三等奖次数"
                      no-border
                    />
                  </wd-cell>
                </view>
              </view>

              <view v-else-if="item.fieldType == 3">
                <wd-cell :title="item.label" required vertical>
                  <wd-radio-group shape="button" v-model="item.submitValue" inline>
                    <wd-radio value="1">是</wd-radio>
                    <wd-radio value="0">否</wd-radio>
                  </wd-radio-group>
                </wd-cell>
              </view>

              <view v-else-if="item.fieldType == 2">
                <wd-cell :title="item.label" required vertical>
                  <wd-input
                    clearable
                    v-model="item.submitValue"
                    border
                    placeholder="请输入"
                    no-border
                  />
                </wd-cell>
              </view>

              <!-- 多选 -->
              <view v-else-if="item.fieldType == 4">
                <view v-if="item.configKey === 58">
                  <wd-cell :title="item.label" required vertical>
                    <wd-picker
                      :columns="breakFaithOptions"
                      v-model="item.submitValue"
                      @confirm="handleConfirmBreakFaith"
                      label-width="0%"
                    />
                  </wd-cell>
                </view>
                <view v-else-if="item.configKey === 63">
                  <wd-cell :title="item.label" required vertical>
                    <wd-picker
                      :columns="executionerOptions"
                      v-model="item.submitValue"
                      label-width="0%"
                    />
                  </wd-cell>
                </view>
              </view>
              <!-- <view v-else-if="item.fieldType == 2">
              <wd-cell :title="`${index + 1}.${item.name}`" required vertical>
                <wd-input-number v-model="item.submitValue" :min="0" />
              </wd-cell>
            </view> -->
            </view>
            <view v-else>
              <wd-cell :title="item.label" title-width="400rpx" required>
                <wd-input
                  clearable
                  v-model="item.submitValue"
                  border
                  placeholder="请输入"
                  no-border
                />
              </wd-cell>
            </view>

            <div v-if="item.tips">
              <view class="px-3">
                <view class="divider"></view>
              </view>
              <view class="text-gray-500 text-xs my-2 px-4 pb-3">{{ item.tips }}</view>
            </div>
            <view class="divider"></view>
          </view>
        </wd-cell-group>
      </scroll-view>
    </view>
    <view class="footer flex justify-center">
      <wd-button @click="prevStep" :disabled="active === 0">上一步</wd-button>
      <view class="mx-4"></view>
      <wd-button @click="handleSubmit">
        {{ stepList.length - 1 === active ? '提交' : '下一步' }}
      </wd-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { groupByModuleType, flatten2DArray } from '@/utils/index'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const active = ref(0)
const groupedData = ref([])
const selectBreakFaith = ref({
  label: '',
})
const stepList = ref([
  {
    title: '基础信息',
  },
  {
    title: '技术创新',
  },
  {
    title: '成长经营',
  },
  {
    title: '辅助指标',
  },
  {
    title: '加分指标',
  },
  {
    title: '负面指标',
  },
])

// 1=守信组织（企业），2=信用异常组织（企业），3=-般失信组织（企业）

const breakFaithOptions = [
  {
    label: '守信组织（企业）',
    value: 0,
  },
  {
    label: '信用异常组织（企业）',
    value: 1,
  },
  {
    label: '一般失信组织（企业）',
    value: 2,
  },
  {
    label: '严重失信组织（企业）',
    value: 3,
  },
]
// 1=守信组织，2=信用异常组织，3=一般失信组织，4=严重失信组织
const executionerOptions = [
  { label: '守信组织', value: 0 },
  { label: '信用异常组织', value: 1 },
  { label: '一般失信组织', value: 2 },
  { label: '严重失信组织', value: 3 },
]

const handleConfirmBreakFaith = ({ value, selectedItems }) => {
  selectBreakFaith.value = selectedItems
}

function nextStep() {
  active.value = active.value + 1
}

function handleSubmit() {
  if (active.value < stepList.value.length - 1) {
    nextStep()
    return
  }

  const params = { orgIndices: flatten2DArray(groupedData.value), orgId: userInfo?.orgId }

  console.log('params', params)
  // 提交
  http.post('/program/score/save-org-index', { params }).then((resp) => {
    uni.showToast({ title: '操作成功', icon: 'success' })
    uni.navigateBack()
  })
}

function prevStep() {
  if (active.value === 0) return
  active.value = active.value - 1
}
const getList = () => {
  http.post('/program/score/get-org-index', { orgId: 0 }).then((res) => {
    let resData = res.data.map((v) => {
      return {
        ...v,
        submitValue: v.submitValue || '',
      }
    })

    let displayIndex = 0
    const processdData = resData.map((item) => {
      if (![45, 46, 48, 49].includes(item.configKey)) {
        // 不需要显示序号的 configKey 列表
        displayIndex++
      }
      return {
        ...item,
        displayIndex: displayIndex,
        label: `${displayIndex}. ${item.name}`,
      }
    })
    // 调用函数归类
    const data = groupByModuleType(processdData)
    groupedData.value = Object.values(data)
  })
}

onLoad(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.page-prefect-org {
  min-height: calc(100vh - 50rpx);
  .header {
    background: #fff;
    height: 100rpx;
  }
  .main {
    padding: 20rpx;
  }
  .footer {
    height: 100rpx;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
.divider {
  height: 1px;
  transform: scaleY(0.5);
  background: #e8e8e8e8;
}
</style>
