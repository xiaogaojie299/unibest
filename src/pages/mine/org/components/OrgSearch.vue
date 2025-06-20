<template>
  <div>
    <view class="bg-white">
      <h5 class="px-4">你所在的组织名称</h5>
      <wd-search
        v-model="serchKey"
        placeholder-left
        placeholder="你所在的组织名称"
        @blur="emits('blur')"
        @focus="emits('focus')"
      >
        <template #suffix>
          <view class="px-4">
            <wd-button :round="false" type="primary" size="small" @click="getAllOrgList">
              查询
            </wd-button>
          </view>
        </template>
      </wd-search>
    </view>
  </div>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'

const emits = defineEmits(['search', 'blur', 'focus'])

const props = defineProps({
  api: {
    type: String,
    default: '/program/org/get-all-org',
  },
})
const parkId = computed(() => uni.getStorageSync('CACHE_PARKID'))
const serchKey = ref('')
const orgList = ref([])
const getAllOrgList = () => {
  console.log('props.api', props.api)
  http
    .post(props.api, {
      parkId: parkId.value,
      name: serchKey.value,
    })
    .then((res) => {
      orgList.value = res.data
      emits('search', orgList.value)
    })
}
const initData = () => {
  getAllOrgList()
}
onLoad(() => {
  initData()
})
</script>
