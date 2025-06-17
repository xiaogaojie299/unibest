<route lang="json5">
{
  style: {
    navigationBarTitleText: '选择园区',
  },
}
</route>
<template>
  <div class="page-container">
    <div>
      <wd-sticky>
        <view style="width: 100vw">
          <wd-search v-model="state.name" placeholder-left hide-cancel @search="onSearch">
            <template #prefix>
              <view class="search-type">
                <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
                <text>成都</text>
              </view>
            </template>
          </wd-search>
        </view>
        <wd-drop-menu>
          <wd-drop-menu-item
            :title="state.provinceIdName"
            v-model="state.provinceId"
            :options="provinceData"
            @change="handleChange"
            value-key="id"
            label-key="name"
          />

          <wd-drop-menu-item
            :title="state.marketName"
            v-model="state.marketId"
            :options="markeData"
            @change="handleChange"
            value-key="id"
            label-key="name"
          />

          <wd-drop-menu-item
            :title="state.areaName"
            v-model="state.areaId"
            :options="areaData"
            @change="handleChange"
            value-key="id"
            label-key="name"
          />

          <wd-drop-menu-item
            :title="state.streetName"
            v-model="state.streetId"
            :options="streetData"
            @change="handleChange"
            value-key="id"
            label-key="name"
          />
        </wd-drop-menu>
      </wd-sticky>
    </div>
    <view class="mt-4 px-3">
      <template v-if="list?.length">
        <view v-for="item in list" :key="item.id">
          <component-park-card :info="item"></component-park-card>
        </view>
      </template>
      <template v-else>
        <wd-status-tip image="content" tip="暂无内容" />
      </template>
    </view>
  </div>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { addLevelField } from '@/utils/index'
import ComponentParkCard from './components/ParkCard.vue'
const state = reactive({
  name: '', // 园区名称
  countryId: '', // 国家ID
  provinceId: '', // 省份ID
  provinceIdName: '省',
  marketId: '', // 市区
  marketName: '市',
  areaId: '', // 区域ID
  areaName: '区',
  streetId: '', // 街道ID
  streetName: '镇',
})
const location = ref({
  latitude: null as number | null,
  longitude: null as number | null,
  address: '',
})
const list = ref([])
const areaAllTreeData = ref([])

const provinceData = ref([])
const markeData = ref([])
const areaData = ref([])
const streetData = ref([])
const handleChange = (e) => {
  console.log(e)

  if (e.value) {
    getList()
  }
  switch (e.selectedItem.level) {
    case 1: // 选择国家
      state.countryId = e.value
      break
    case 2: // 选择省
      state.provinceId = e.value
      state.provinceIdName = e.selectedItem.name
      markeData.value = e.selectedItem.children
      break
    case 3: // 选择市区
      state.marketId = e.value
      state.marketName = e.selectedItem.name
      areaData.value = e.selectedItem.children
      break
    case 4: // 选择区域
      state.areaId = e.value
      state.areaName = e.selectedItem.name
      streetData.value = e.selectedItem.children
      break
    case 5: // 选择街道
      state.streetId = e.value
      state.streetName = e.selectedItem.name
      break
  }
}

const onSearch = () => {
  console.log('搜索')
  getList()
}
const getareaAllTreeData = () => {
  http.post('/program/index/region-tree').then((res) => {
    let data = addLevelField(res.data)
    if (data.length > 0 && data[0].children.length > 0) {
      provinceData.value = data[0].children
    }
    areaAllTreeData.value = data
  })
}
const getList = () => {
  http
    .post('/program/index/get-park-list', {
      name: state.name,
      countryId: state.countryId || 0,
      latitude: location.value.latitude,
      longitude: location.value.longitude,
      marketId: state.marketId || undefined,
      provinceId: state.provinceId || undefined,
      areaId: state.areaId || undefined,
      streetId: state.streetId || undefined,
    })
    .then((res) => {
      console.log(res)
      list.value = res.data
    })
}

// 可选：逆地理编码，根据经纬度获取地址
function reverseGeocode(lat: number, lon: number) {
  uni.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${lat},${lon}`,
      key: 'YOUR_TENCENT_MAP_API_KEY', // 替换为你自己的腾讯地图API Key
    },
    success: (res) => {
      if (res.statusCode === 200 && res.data.status === 0) {
        location.value.address = res.data.result.address
      }
    },
    fail: (err) => {
      console.error('逆地理编码失败', err)
    },
  })
}

const getLocation = () => {
  uni.getLocation({
    type: 'wgs84', // 坐标类型，可选'gcj02'(国测局)、'wgs84'(GPS)
    success: (res) => {
      console.log('当前位置：', res)
      location.value.latitude = res.latitude
      location.value.longitude = res.longitude

      // 可选：通过逆地理编码获取地址信息
      // reverseGeocode(res.latitude, res.longitude)
    },
    fail: (err) => {
      console.error('获取位置失败', err)
      uni.showToast({ title: '定位失败', icon: 'none' })
    },
  })
}

onLoad(() => {
  getLocation()
  getareaAllTreeData()
  getList()
})
</script>
<style lang="scss" scoped>
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  text {
    font-size: 22rpx;
    color: rgba(0, 0, 0, 0.65);
  }
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
</style>
