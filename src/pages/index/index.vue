<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="page flex-col page-container">
    <view class="block_7 flex-col">
      <view class="group_11 flex-col">
        <view class="list_3 flex-col">
          <view class="list-items_1 flex-col" v-for="(item, index) in loopData0" :key="index">
            <view class="box_12 flex-row justify-between">
              <view class="box_2 flex-col"></view>
              <text class="text_1">{{ item.lanhutext0 }}</text>
            </view>
            <view class="box_13 flex-row">
              <view class="image-text_29 flex-col">
                <image class="label_1" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
                <text class="text-group_2">{{ item.lanhutext1 }}</text>
              </view>
              <view class="image-text_30 flex-col">
                <image class="label_2" referrerpolicy="no-referrer" :src="item.lanhuimage1" />
                <text class="text-group_3">{{ item.lanhutext2 }}</text>
              </view>
              <view class="image-text_31 flex-col" @click="handleGoScore">
                <image class="label_3" referrerpolicy="no-referrer" :src="item.lanhuimage2" />
                <text class="text-group_4">{{ item.lanhutext3 }}</text>
              </view>
              <view class="image-text_32 flex-col">
                <image class="label_4" referrerpolicy="no-referrer" :src="item.lanhuimage3" />
                <text class="text-group_5">{{ item.lanhutext4 }}</text>
              </view>
              <view class="image-text_33 flex-col">
                <image class="label_11" referrerpolicy="no-referrer" :src="item.lanhuimage4" />
                <text class="text-group_6">{{ item.lanhutext5 }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="box_3 flex-col">
        <view class="block_8 flex-row">
          <view class="box_4 flex-col"></view>
          <text class="text_2">企业服务</text>
          <view class="image-text_34 flex-row justify-between">
            <text class="text-group_7">更多</text>
            <image
              class="thumbnail_2"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2e235c3319b933e886e0e0e50390d735d593c62793cafe7f3a825e2fa3ae40ea"
            />
          </view>
        </view>
        <view class="block_9 flex-row justify-end">
          <view class="image-text_35 flex-col">
            <image
              class="label_12"
              referrerpolicy="no-referrer"
              src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd38316d3a794f1d8077ccaa7f18c3a7_mergeImage.png"
            />
            <text class="text-group_8">技术转移</text>
          </view>
          <view class="image-text_36 flex-col">
            <image
              class="label_13"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3a72a1829aaa265f1cd956f9ded33d8e659ebb9d6a6320dced6111fccc045aa6"
            />
            <text class="text-group_9">成果转化</text>
          </view>
          <view class="image-text_37 flex-col">
            <image
              class="image_1"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge416d98ee2b1d6c54083df5103057765d99d76051b5e7a834c1acff0ee6a54cc"
            />
            <text class="text-group_10">知识产权</text>
          </view>
          <view class="image-text_38 flex-col">
            <image
              class="label_8"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5fb7f2c3599a470a06c07b9c7b1a252c2761cffaca2eec59431491534457e7db"
            />
            <text class="text-group_11">创业辅导</text>
          </view>
          <view class="image-text_39 flex-col">
            <image
              class="label_14"
              referrerpolicy="no-referrer"
              src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e707112f2aa04194973fd327ac25519b_mergeImage.png"
            />
            <text class="text-group_12">政产学研</text>
          </view>
          <view class="image-wrapper_3 flex-row">
            <image
              class="label_14"
              referrerpolicy="no-referrer"
              :src="item.lanhuimage0"
              v-for="(item, index) in loopData1"
              :key="index"
            />
          </view>
        </view>
        <view class="block_10 flex-row">
          <view class="group_12 flex-row">
            <view class="image-text_40 flex-col">
              <image
                class="label_10"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng725ebd568e0c5340e945fc211c79b6e5908d8e5177f2634d126719be60c49c7d"
              />
              <text class="text-group_13">金融服务</text>
            </view>
            <view class="image-text_41 flex-col">
              <image
                class="label_15"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng22276fe2e8f6d211108b5c87a600a75f4cae514e5859d115c0dc6738254a1301"
              />
              <text class="text-group_29">市场对接</text>
            </view>
            <view class="image-text_42 flex-col">
              <image
                class="label_16"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng494968dbb549040b6c9ceebb7947009856667d7e3aded16efb42b16f737d2b43"
              />
              <text class="text-group_30">检验检测</text>
            </view>
            <view class="image-text_43 flex-col">
              <view class="image-wrapper_4 flex-col">
                <image
                  class="thumbnail_22"
                  referrerpolicy="no-referrer"
                  src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng9dc8081d0b776dbca692283ac747f4f140949930fcfd0485ab6edf8aa4df84e9"
                />
                <image
                  class="thumbnail_23"
                  referrerpolicy="no-referrer"
                  src="https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/6559500b6f3646648c49e94593a35f16_mergeImage.png"
                />
              </view>
              <text class="text-group_31">技术创新</text>
            </view>
            <view class="image-text_44 flex-col">
              <image
                class="label_17"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngfa434c2a9ad3b320ddd49d42e07c986baaafdc80cf96f7119db08f206b674f74"
              />
              <text class="text-group_32">法律服务</text>
            </view>
          </view>
        </view>
      </view>
      <view class="box_5 flex-col">
        <view class="box_14 flex-row justify-between">
          <view class="section_3 flex-col"></view>
          <text class="text_3">提交需求</text>
        </view>
        <view class="block_5 flex-row">
          <text class="text_4">手机号</text>
          <image
            class="thumbnail_3"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1a7aac8260d2567ca8a2379820c56a7053efe6c61aad165263a6bcb1239074b4"
          />
          <view class="text-wrapper_7 flex-col">
            <text class="text_22">修改</text>
          </view>
        </view>
        <view class="text-wrapper_1 flex-col">
          <text class="text_5">描述您的需求，我们会第一时间为您响应</text>
        </view>
        <view class="text-wrapper_2 flex-col">
          <text class="text_6">立即提交</text>
        </view>
        <view class="text-wrapper_3">
          <text class="text_7">今日已有</text>
          <text class="text_8">356</text>
          <text class="text_9">人提交需求</text>
        </view>
      </view>
      <view class="box_6 flex-col">
        <view class="block_11 flex-row">
          <view class="box_7 flex-col"></view>
          <text class="text_10">最新活动</text>
          <view class="image-text_45 flex-row justify-between">
            <text class="text-group_14">更多</text>
            <image
              class="thumbnail_4"
              referrerpolicy="no-referrer"
              src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng2e235c3319b933e886e0e0e50390d735d593c62793cafe7f3a825e2fa3ae40ea"
            />
          </view>
        </view>
        <view class="block_12 flex-row justify-between">
          <view class="group_4 flex-col"></view>
          <view class="box_15 flex-col">
            <text class="text_11">企业家俱乐部线下沙龙第2期</text>
            <view class="image-text_46 flex-row justify-between">
              <image
                class="thumbnail_5"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng48b390a64358641616e4f1b85b5a8bc5c02a08bd6e59ac1c50ca2d296c36d651"
              />
              <text class="text-group_15">天府软件园</text>
            </view>
            <view class="image-text_47 flex-row justify-between">
              <image
                class="thumbnail_6"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga680f756356c334f506226127dc635cf8d01ff643692aecb079982533808f66c"
              />
              <text class="text-group_16">2023年4月3日-2023年5月6日</text>
            </view>
            <view class="image-text_48 flex-row justify-between">
              <image
                class="thumbnail_7"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb1a774a7ec531f59b91c2c912308a4b021ab1e5d13b5c3bd719313f9a7e4ffd7"
              />
              <text class="text-group_17">¥60/人</text>
            </view>
          </view>
        </view>
        <view class="text-wrapper_8 flex-row justify-between">
          <text class="text_12">报名中</text>
          <text class="text_13">35人已报名</text>
        </view>
        <image
          class="image_2"
          referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6d91581fb06edf3c8efee6eb571874a26a73e5824668541f24ce4c2883aaf527"
        />
        <view class="block_13 flex-row justify-between">
          <view class="group_7 flex-col"></view>
          <view class="box_16 flex-col">
            <text class="text_14">企业家俱乐部线下沙龙第2期</text>
            <view class="image-text_49 flex-row justify-between">
              <image
                class="thumbnail_8"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng48b390a64358641616e4f1b85b5a8bc5c02a08bd6e59ac1c50ca2d296c36d651"
              />
              <text class="text-group_18">天府软件园</text>
            </view>
            <view class="image-text_50 flex-row justify-between">
              <image
                class="thumbnail_9"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga680f756356c334f506226127dc635cf8d01ff643692aecb079982533808f66c"
              />
              <text class="text-group_19">2023年4月3日-2023年5月6日</text>
            </view>
            <view class="image-text_51 flex-row justify-between">
              <image
                class="thumbnail_10"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb1a774a7ec531f59b91c2c912308a4b021ab1e5d13b5c3bd719313f9a7e4ffd7"
              />
              <text class="text-group_20">¥60/人</text>
            </view>
          </view>
        </view>
        <view class="text-wrapper_9 flex-row justify-between">
          <text class="text_15">进行中</text>
          <text class="text_16">35人已报名</text>
        </view>
        <image
          class="image_3"
          referrerpolicy="no-referrer"
          src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6d91581fb06edf3c8efee6eb571874a26a73e5824668541f24ce4c2883aaf527"
        />
        <view class="block_14 flex-row justify-between">
          <view class="box_8 flex-col"></view>
          <view class="section_8 flex-col">
            <text class="text_17">企业家俱乐部线下沙龙第2期</text>
            <view class="image-text_52 flex-row justify-between">
              <image
                class="thumbnail_11"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng48b390a64358641616e4f1b85b5a8bc5c02a08bd6e59ac1c50ca2d296c36d651"
              />
              <text class="text-group_21">天府软件园</text>
            </view>
            <view class="image-text_53 flex-row justify-between">
              <image
                class="thumbnail_12"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga680f756356c334f506226127dc635cf8d01ff643692aecb079982533808f66c"
              />
              <text class="text-group_22">22023年4月3日-2023年5月6日</text>
            </view>
            <view class="image-text_54 flex-row justify-between">
              <image
                class="thumbnail_13"
                referrerpolicy="no-referrer"
                src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb1a774a7ec531f59b91c2c912308a4b021ab1e5d13b5c3bd719313f9a7e4ffd7"
              />
              <text class="text-group_23">¥60/人</text>
            </view>
          </view>
        </view>
        <view class="text-wrapper_10 flex-row justify-between">
          <text class="text_18">已结束</text>
          <text class="text_19">35人已报名</text>
        </view>
      </view>
      <view class="box_11 flex-col">
        <view class="block_15 flex-row justify-between" @click.stop="handleGoSelectPark">
          <text class="text_20">请选择空间载体</text>
          <image
            class="thumbnail_18"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng31a03cfb6ab0b9cc002deeafb1d168c2327c41b5cae2729c7b95620e76f9226b"
          />
        </view>
        <view class="">
          <wd-search v-model="serchKey" placeholder-left placeholder="搜索" hide-cancel></wd-search>
        </view>
        <!-- <view class="section_6 flex-row"></view> -->
        <view class="section_7 flex-col"></view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const serchKey = ref('')

const loopData0 = [
  {
    lanhutext0: '公共服务',
    lanhuimage0:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb543d61dd6b02ac1e55a37fee012db1a38eb76daad4a1ca1896ed7d130bdefe9',
    lanhutext1: '行业报告',
    lanhuimage1:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge2bcd378b612230ef1e9363a458cc40298715671b9b4e44843e9256b009a7139',
    lanhutext2: '办公用品',
    lanhuimage2:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5d82cc1c3a1ae95ce7290a215dbcf17ae0d4d66be678d82341e47c68c36cdc1f',
    lanhutext3: '创新积分',
    lanhuimage3:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng719517b126731f56edddaed760fd99abaa5bbbaa2076b4aceae3e8504d275b47',
    lanhutext4: '创新资源',
    lanhuimage4:
      'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/4f99491f5f76488e8161d180cc8fba31_mergeImage.png',
    lanhutext5: '股权投资',
  },
  {
    lanhutext0: '空间服务',
    lanhuimage0:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb47b912da71680d3524aeed39df3e629b6f731856b270ae1f3750891c2d87246',
    lanhutext1: '空间出售',
    lanhuimage1:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd90d06a21e83baea33fec2870b9d8704329c18c861c87dcdf89856345e3ce71d',
    lanhutext2: '入驻服务',
    lanhuimage2:
      'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/ef672002a24e43808bc0593b2b0ceac9_mergeImage.png',
    lanhutext3: '约会议室',
    lanhuimage3:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng19aa30e069b49e824232ac8ef674ed844b37e51dfeeb465ff08ce43a1bada26d',
    lanhutext4: '空间配套',
    lanhuimage4:
      'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/f7575a60c33a4f6ba3cf4a14c1fdaadb_mergeImage.png',
    lanhutext5: '智慧食堂',
  },
]
const loopData1 = [
  {
    lanhuimage0:
      'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e707112f2aa04194973fd327ac25519b_mergeImage.png',
  },
  {
    lanhuimage0:
      'https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd38316d3a794f1d8077ccaa7f18c3a7_mergeImage.png',
  },
  {
    lanhuimage0:
      'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3a72a1829aaa265f1cd956f9ded33d8e659ebb9d6a6320dced6111fccc045aa6',
  },
]

const constants = {}

const handleGoScore = () => {
  uni.navigateTo({
    url: '/pages/index/score/index',
  })
}

const handleGoSelectPark = () => {
  console.log('handleGoSelectPark')
  uni.navigateTo({
    url: '/pages/park/change-park',
  })
}
</script>
<style lang="scss" scoped>
@import '../../style/common.css';
@import './index.rpx.css';
::v-deep {
  .wd-search {
    background-color: transparent;
  }
}
</style>
