<route lang="json5">
{
  style: {
    navigationBarTitleText: '企业认证',
  },
}
</route>
<template>
  <view class="page-container">
    <view
      v-if="orgStatus === 0"
      class="py-3 text-center"
      style="background: var(--wot-color-theme)"
    >
      审核中
    </view>
    <view
      v-else-if="orgStatus === 2"
      class="py-3 text-center"
      style="background: var(--wot-color-theme)"
    >
      <view class="">已拒绝</view>
      <view v-if="formData.remark" class="text-sm text-red">平台备注：{{ formData.remark }}</view>
    </view>
    <view class="py-2 px-2">
      <view class="mb-4"></view>
      <view class="rounded-lg bg-white px-3 py-2">
        <f-section>企业组织</f-section>
        <view class="mt-3">
          <text lines="1" class="label-class">营业执照</text>
          <view class="mt-2">
            <wd-upload
              :file-list="fileList"
              image-mode="aspectFill"
              @change="handleChangeUploadImg"
              :upload-method="customUpload"
              :disabled="isReadOnly"
            ></wd-upload>
          </view>
          <view class="mt-1">
            <text lines="1" class="label-class">企业名称</text>
            <view class="mt-2">
              <wd-input
                clearable
                v-model="formData.orgName"
                placeholder="请输入"
                :disabled="isReadOnly"
              />
            </view>
          </view>
          <view class="mt-2">
            <text lines="1" class="label-class">组织机构代码</text>
            <view class="mt-2">
              <wd-input
                clearable
                v-model="formData.idCard"
                placeholder="请输入"
                :disabled="isReadOnly"
              />
            </view>
          </view>
          <view class="mt-2">
            <text lines="1" class="label-class">法人名称</text>
            <view class="mt-2">
              <wd-input
                clearable
                v-model="formData.legalName"
                placeholder="请输入"
                :disabled="isReadOnly"
              />
            </view>
          </view>
          <view class="mt-2">
            <text lines="1" class="label-class">注册资本</text>
            <view class="mt-2">
              <wd-input
                clearable
                v-model.number="formData.capital"
                placeholder="请输入"
                type="number"
                :disabled="isReadOnly"
              />
            </view>
          </view>
          <view class="mt-2">
            <text lines="1" class="label-class">成立时间</text>
            <view class="mt-2">
              <wd-input
                v-model="formData.orgCreateTime"
                clearable
                placeholder="请输入"
                :disabled="isReadOnly"
              />
            </view>
          </view>
          <view class="my-5">
            <wd-radio-group shape="dot" v-model="formData.type" inline :disabled="isReadOnly">
              <wd-radio :value="1">法人认证</wd-radio>
              <wd-radio :value="2">非法人认证</wd-radio>
            </wd-radio-group>
          </view>
          <view v-if="formData.type == 1">
            <view class="mt-2">
              <text lines="1" class="label-class">法人姓名</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.legalName"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
            <view class="mt-2">
              <text lines="1" class="label-class">法人身份证</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.legalIdCard"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
            <view class="mt-2">
              <text lines="1" class="label-class">法人手机号</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.legalMobile"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
          </view>
          <view v-else>
            <view class="mt-2">
              <text lines="1" class="label-class">负责人姓名</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.chargeName"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
            <view class="mt-2">
              <text lines="1" class="label-class">负责人身份证</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.chargeIdCard"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
            <view class="mt-2">
              <text lines="1" class="label-class">负责人手机号</text>
              <view class="mt-2">
                <wd-input
                  v-model="formData.chargeMobile"
                  clearable
                  placeholder="请输入"
                  :disabled="isReadOnly"
                />
              </view>
            </view>
            <view class="mt-2">
              <text lines="1" class="label-class">授权书</text>
              <view class="mt-2">
                <wd-upload
                  :file-list="authorizeUrlList"
                  image-mode="aspectFill"
                  :upload-method="customUpload"
                  :disabled="isReadOnly"
                ></wd-upload>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="mt-4 footer-btn">
        <wd-button v-if="orgStatus === ''" block round @click="handleSubmit" :loading="loading">
          提交认证
        </wd-button>
        <!-- 审核中 -->
        <wd-button v-else-if="orgStatus === 0" block round @click="handleDelete">删除</wd-button>
        <!-- 已拒绝 -->
        <view v-else-if="orgStatus == 2" class="flex itms-center justify-center">
          <wd-button type="info" round @click="handleCancel">取消</wd-button>
          <view class="px-3"></view>
          <wd-button round @click="handleSubmit">重新提交</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'

import { uploadFile } from '@/utils/uploadFile'
import { http } from '@/utils/http'
import fSection from '@/components/f-section.vue'
import dayjs from 'dayjs'

const message = useMessage()

const fileList = ref([])
const authorizeUrlList = ref([])
const loading = ref(false)
const formData = ref({
  coverUrl: '', // 营业执照
  orgName: '', //组织名称
  idCard: '', // 唯一信用社会编码
  capital: '', // 注册资本呢
  chargeIdCard: '', //负责人身份证
  chargeMobile: '', // 负责人电话
  chargeName: '', // 负责人姓名
  legalIdCard: '', // 法人身份证
  legalMobile: '', // 法人电话
  legalName: '', // 法人姓名
  orgCreateTime: '', // 成立的时间
  type: 1, // 认证类型(1法人认证 2非法人认证)
  authorizeUrl: '', // 授权文件
  remark: '',
})
const orgStatus = ref('') // 审核状态(0待审核 1通过 2驳回)
const recordId = ref(undefined)
const parkId = computed(() => uni.getStorageSync('CACHE_PARKID'))

const isReadOnly = computed(() => {
  return orgStatus.value === 0 || orgStatus.value === 1
})
const handleChangeUploadImg = (value) => {
  console.log(value)
}

const customUpload = (file, formData, options) => {
  console.log(file, formData, options)
  uploadFile({
    url: import.meta.env.VITE_UPLOAD_BASEURL,
    tempFilePath: file.url,
    formData,
    onSuccess: (res) => {
      console.log('上传成功', res)
      fileList.value.push(res)
    },
  })
}

const handleCancel = () => {
  uni.navigateBack()
}
const handleSubmit = () => {
  loading.value = true
  try {
    let params = { ...formData.value }
    params.coverUrl = fileList.value[0]?.url
    params.parkId = parkId.value
    http.post('/program/org/add-org', params).then((res) => {
      loading.value = false
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/mine/org/add-callback',
        })
      }, 500)
    })
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const handleDelete = () => {
  if (!recordId.value) return
  message
    .confirm({
      msg: '',
      title: '确认要删除吗',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    .then(() => {
      http.post('/program/org/del-org-approve', { id: recordId.value }).then(() => {
        uni.showToast({ title: '删除成功', icon: 'success' })
        uni.navigateBack()
      })
    })
}

const getOrgDetail = () => {
  http.post('/program/org/add-org-init').then((res) => {
    if (!res.data) {
      return
    }

    formData.value = { ...res.data }
    recordId.value = res.data.id || undefined

    //营业执照
    if (res.data.coverUrl) {
      fileList.value = [{ url: res.data.coverUrl }]
    }
    // 授权书
    if (res.data.authorizeUrl) {
      authorizeUrl.value = res.data.authorizeUrl
    }
    // 成立时间
    if (res.data.orgCreateTime) {
      formData.value.orgCreateTime = dayjs(formData.value.orgCreateTime).format('YYYY-MM-DD')
    }
    // 状态
    orgStatus.value = res.data.status
  })
}

const initData = () => {
  getOrgDetail()
}

onShow(() => {
  initData()
})
</script>
<style lang="scss" scoped>
.label-class {
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 18px;
}
::v-deep {
  .wd-radio__label {
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .wd-input {
    // background-color: transparent;
    background-color: rgba(249, 249, 249, 1) !important;
    border-radius: 6px;
    width: 100%;
    border: none;
    padding: 5px 8px;
    box-sizing: border-box;
  }
  .wd-input::after {
    display: none;
  }
}
</style>
