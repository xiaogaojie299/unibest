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
      <wd-cell-group border>
        <view v-for="(item, index) in groupedData[active]" :key="item.id">
          <view v-if="[4, 5].includes(active)">
            <!-- 真的恼火  -->
            <view v-if="[44, 45, 46].includes(item.configKey)">
              <view v-if="item.configKey === 44">
                <wd-cell :title="`${item.displayIndex}.${item.name}`" required vertical>
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
                <wd-cell :title="`${item.displayIndex}.${item.name}`" required vertical>
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
              <wd-cell :title="`${item.displayIndex}.${item.name}`" required vertical>
                <wd-radio-group shape="button" v-model="item.submitValue" inline>
                  <wd-radio value="1">是</wd-radio>
                  <wd-radio value="0">否</wd-radio>
                </wd-radio-group>
              </wd-cell>
            </view>

            <view v-else-if="item.fieldType == 2">
              <wd-cell :title="`${item.displayIndex}.${item.name}`" required vertical>
                <wd-input
                  clearable
                  v-model="item.submitValue"
                  border
                  placeholder="请输入"
                  no-border
                />
              </wd-cell>
            </view>

            <view v-else-if="item.fieldType == 4">
              <wd-cell :title="`${item.displayIndex}.${item.name}`" required vertical is-link>
                {{ item.submitValue || '请选择' }}
              </wd-cell>
            </view>
            <!-- <view v-else-if="item.fieldType == 2">
              <wd-cell :title="`${index + 1}.${item.name}`" required vertical>
                <wd-input-number v-model="item.submitValue" :min="0" />
              </wd-cell>
            </view> -->
          </view>
          <view v-else>
            <wd-cell :title="`${item.displayIndex}.${item.name}`" title-width="400rpx" required>
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
            <view class="divider"></view>
            <view class="text-gray-500 text-xs my-2 px-4">{{ item.tips }}</view>
          </div>
        </view>
      </wd-cell-group>
    </view>
    <view class="footer flex justify-center">
      <wd-button size="small" @click="prevStep">上一步</wd-button>
      <wd-button size="small" @click="nextStep">下一步</wd-button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { groupByModuleType } from '@/utils/index'

const active = ref(0)
const groupedData = ref([])
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
function nextStep() {
  active.value = active.value + 1
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
  display: flex;
  flex-direction: column;
  .header {
    background: #fff;
    height: 100rpx;
  }
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 20rpx;
  }
  .footer {
    height: 100rpx;
  }
}
.divider {
  height: 1px;
  transform: scaleY(0.5);
  background: #e8e8e8e8;
}
</style>
