<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的信息',
  },
}
</route>
<template>
  <view class="page-mine-edit-user-info">
    <view class="h-3 page-theme-bg w-full"></view>
    <view>
      <wd-cell-group title="" border>
        <wd-cell title="头像" center>
          <view class="flex items-center flex-justify-end" @click="handleAvatar">
            <wd-img round :src="userInfo.avatarUrl" width="120rpx" height="120rpx"></wd-img>
            <wd-icon name="arrow-right" color="rgba(0, 0, 0, 0.25)" size="36rpx"></wd-icon>
          </view>
        </wd-cell>

        <wd-cell title="昵称" is-link @click="handleEditNickName" center>
          <view>{{ userInfo.nickName }}</view>
        </wd-cell>

        <wd-cell title="手机" is-link @click="handleEditPhone" center>
          <view>{{ userInfo.phonenumber }}</view>
        </wd-cell>

        <wd-cell title="性别" center>
          <wd-radio-group inline v-model="userInfo.sex" shape="dot" @change="editUserInfo">
            <wd-radio :value="0">男</wd-radio>
            <wd-radio :value="1">女</wd-radio>
          </wd-radio-group>
        </wd-cell>
        <wd-datetime-picker
          type="date"
          align-right
          v-model="userInfo.birthday"
          label="生日"
          :minDate="getMinDate()"
          :maxDate="getMaxDate()"
          @confirm="editUserInfo"
        />
        <wd-col-picker
          label="地区"
          align-right
          v-model="addressValue"
          :columns="area"
          :column-change="columnChange"
          @confirm="handleConfirmAddress"
        ></wd-col-picker>

        <wd-cell title="个人简介" center vertical>
          <wd-textarea
            @blur="editUserInfo"
            v-model="userInfo.remark"
            placeholder="简单介绍下自己吧！"
          />
        </wd-cell>
        <wd-cell title="" center vertical>
          <wd-button type="error" block round @click="handleLogout">退出登录</wd-button>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { useUpload } from '@/utils/uploadFile'
import { useMessage } from 'wot-design-uni'
import { useToast } from 'wot-design-uni'
import { useColPickerData } from '@/hooks/useColPickerData'
import { useUserStore } from '@/store'

import dayjs from 'dayjs'

const { colPickerData, findChildrenByCode } = useColPickerData()

const userStore = useUserStore()
const message = useMessage()
const toast = useToast()

const userInfo = reactive({
  userId: '',
  nickName: '',
  phonenumber: '',
  address: '',
  avatarUrl: '',
  birthday: '',
  remark: '',
  sex: '',
})
const addressValue = ref([])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])

const getMinDate = () => {
  return new Date('1960-01-1').getTime()
}
const getMaxDate = () => {
  return new Date().getTime()
}

const initArea = () => {
  if (addressValue.value?.length === 2) {
    area.value = [
      ...area.value,
      findChildrenByCode(colPickerData, addressValue.value[1])!.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
      findChildrenByCode(colPickerData, addressValue.value[2])!.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    ]
  }
  console.log(area.value)

  console.log(addressValue.value)
}

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    )
  } else {
    finish()
  }
}

const getUserInfo = () => {
  http.post('/program/profile/user-info').then((res) => {
    console.log('res', res.data)
    userInfo.nickName = res.data.nickName
    userInfo.phonenumber = res.data.phonenumber
    userInfo.address = res.data.address || []
    userInfo.avatarUrl = res.data.avatarUrl
    userInfo.birthday = res.data.birthday
    userInfo.remark = res.data.remark
    userInfo.sex = res.data.sex
    userInfo.userId = res.data.userId
    addressValue.value = res.data.addreess?.split(',') || []
    initArea()
  })
}

const handleAvatar = () => {
  const { run } = useUpload(
    import.meta.env.VITE_UPLOAD_BASEURL,
    {},
    {
      onSuccess: (res) => {
        console.log('h5头像上传成功', res.url)
        userInfo.avatarUrl = res.url
        editUserInfo()
      },
    },
  )
  run()
}

const handleEditNickName = () => {
  message
    .prompt({
      title: '修改昵称',
      inputValue: userInfo.nickName,
    })
    .then(({ value }) => {
      userInfo.nickName = value
      console.log('修改昵称成功', value)
      editUserInfo()
    })
}

const handleEditPhone = () => {
  message
    .prompt({
      title: '修改手机号',
      inputValue: userInfo.phonenumber,
    })
    .then(({ value }) => {
      userInfo.phonenumber = value
      editUserInfo()
    })
}

function handleConfirmAddress({ value, selectedItems }) {
  editUserInfo()
}

const editUserInfo = () => {
  userInfo.address = addressValue.value?.join(',')
  let birthday = userInfo.birthday

  if (birthday) {
    birthday = dayjs(birthday).format('YYYY-MM-DD')
  }
  http
    .post('/program/profile/edit-user', {
      ...userInfo,
      birthday,
    })
    .then((res) => {
      getUserInfo()
    })
}

const handleLogout = () => {
  // 退出登录
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useUserStore().logout()
        // 执行退出登录逻辑
        toast.show('退出登录成功')

        uni.reLaunch({ url: '/pages/login/index' })
        // #ifdef MP-WEIXIN
        // 微信小程序，去首页
        // uni.reLaunch({ url: '/pages/index/index' })
        // #endif
        // #ifndef MP-WEIXIN
        // 非微信小程序，去登录页
        // uni.reLaunch({ url: '/pages/login/index' })
        // #endif
      }
    },
  })
}

onMounted(() => {
  getUserInfo()
})
</script>
