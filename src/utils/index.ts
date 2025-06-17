import pagesConfig from '@/pages.json'
import { isMpWeixin } from './platform'

const { pages, subPackages, tabBar = { list: [] } } = { ...pagesConfig }

export const getLastPage = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export const tabBarList = tabBar?.list || []

/** 判断当前页面是否是 tabbar 页  */
export const getIsTabbar = () => {
  try {
    const lastPage = getLastPage()
    const currPath = lastPage?.route

    return Boolean(tabBar?.list?.some((item) => item.pagePath === currPath))
  } catch {
    return false
  }
}

/**
 * 判断指定页面是否是 tabbar 页
 * @param path 页面路径
 * @returns true: 是 tabbar 页 false: 不是 tabbar 页
 */
export const isTableBar = (path: string) => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有 tabBar 的话，list 不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // 这里需要处理一下 path，因为 tabBar 中的 pagePath 是不带 /pages 前缀的
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  return !!tabBar.list.find((e) => e.pagePath === path)
}

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/index'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export const currRoute = () => {
  const lastPage = getLastPage()
  const currRoute = (lastPage as any).$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute as { fullPath: string }
  // console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // 这里处理主包
  const mainPages = pages
    .filter((page) => !key || page[key])
    .map((page) => ({
      ...page,
      path: `/${page.path}`,
    }))

  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  // console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * 根据微信小程序当前环境，判断应该获取的 baseUrl
 */
export const getEnvBaseUrl = () => {
  // 请求基准地址
  let baseUrl = import.meta.env.VITE_SERVER_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_DEVELOP || baseUrl
        break
      case 'trial':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_TRIAL || baseUrl
        break
      case 'release':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_RELEASE || baseUrl
        break
    }
  }

  return baseUrl
}

/**
 * 根据微信小程序当前环境，判断应该获取的 UPLOAD_BASEURL
 */
export const getEnvBaseUploadUrl = () => {
  // 请求基准地址
  let baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_DEVELOP || baseUploadUrl
        break
      case 'trial':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_TRIAL || baseUploadUrl
        break
      case 'release':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_RELEASE || baseUploadUrl
        break
    }
  }

  return baseUploadUrl
}

/**
 * 递归添加层级字段
 * @param data 数据数组
 * @param level 当前层级，默认从 1 开始
 */
export function addLevelField(data: any[], level = 1) {
  return data.map((item) => {
    const newItem = { ...item, level } // 添加 level 字段
    if (item.children && item.children.length > 0) {
      newItem.children = addLevelField(item.children, level + 1) // 递归处理子级
    }
    return newItem
  })
}

/**
 * @description 构造树型结构数据，并添加 level 字段表示层级
 * @param data 数据源
 * @param id id字段 默认 'id'
 * @param parentId 父节点字段 默认 'parentId'
 * @param children 子节点字段 默认 'children'
 * @param level 初始层级，默认从1开始
 * @returns 构造完成的树结构，每个节点包含 level 字段
 */
export const handleTree = (
  data: any[],
  id?: string,
  parentId?: string,
  children?: string,
  level: number = 1,
): any => {
  if (!Array.isArray(data)) {
    console.warn('data must be an array')
    return []
  }

  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  const childrenMap: Record<string, any[]> = {}
  const nodeMap: Record<string, any> = {}
  const tree: any[] = []

  // 初始化映射表并设置 level=1 的根节点
  for (const d of data) {
    const nodeId = d[config.id]
    const parentKey = d[config.parentId]

    if (!childrenMap[parentKey]) {
      childrenMap[parentKey] = []
    }
    childrenMap[parentKey].push(d)

    nodeMap[nodeId] = d

    // 给当前节点赋初始 level
    d[config.childrenList] = d[config.childrenList] || []
    d.level = level
  }

  // 找出所有根节点（没有父节点的节点）
  for (const d of data) {
    const parentKey = d[config.parentId]
    if (!nodeMap[parentKey]) {
      tree.push(d)
    }
  }

  // 递归给所有子节点添加 level 属性
  function setLevel(node: any, currentLevel: number) {
    node.level = currentLevel
    if (childrenMap[node[config.id]]) {
      childrenMap[node[config.id]].forEach((child) => setLevel(child, currentLevel + 1))
    }
  }

  // 为整棵树设置层级
  for (const root of tree) {
    setLevel(root, level)
  }

  // 将子节点挂载到对应父节点上
  for (const d of data) {
    const parentId = d[config.parentId]
    if (parentId && nodeMap[parentId]) {
      if (!nodeMap[parentId][config.childrenList]) {
        nodeMap[parentId][config.childrenList] = []
      }
      nodeMap[parentId][config.childrenList].push(d)
    }
  }

  return tree
}

interface ModuleItem {
  id: number
  orgId: number
  moduleType: number
  name: string
  tips: string | null
  fieldType: number
  configKey: number
  submitValue: any
  createTime: string
  remark: string | null
}

type GroupedModules = Record<number, ModuleItem[]>

/**
 * 根据 moduleType 归类数据
 * @param data 原始数据数组
 * @returns 按 moduleType 分组的对象
 */
export function groupByModuleType(data: ModuleItem[]): GroupedModules {
  return data.reduce((acc, item) => {
    const key = item.moduleType
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as GroupedModules)
}
