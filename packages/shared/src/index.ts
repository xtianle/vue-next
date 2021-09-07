import { makeMap } from './makeMap'

export { makeMap }
export * from './patchFlags'
export * from './shapeFlags'
export * from './slotFlags'
export * from './globalsWhitelist'
export * from './codeframe'
export * from './normalizeProp'
export * from './domTagConfig'
export * from './domAttrConfig'
export * from './escapeHtml'
export * from './looseEqual'
export * from './toDisplayString'

/**
 * List of @babel/parser plugins that are used for template expression
 * transforms and SFC script transforms. By default we enable proposals slated
 * for ES2020. This will need to be updated as the spec moves forward.
 * Full list at https://babeljs.io/docs/en/next/babel-parser#plugins
 * 
 * 用于模板表达式的@babel/parser插件列表
 * 转换和SFC脚本转换。默认情况下，我们启用计划的方案
 * 对于ES2020。这将需要随着规范的发展而更新。
 */
// babel解析器默认插件
export const babelParserDefaultPlugins = [
  'bigInt',
  'optionalChaining',
  'nullishCoalescingOperator'
] as const
/**
 * 空对象
 */
export const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__
  ? Object.freeze({})
  : {}
/**
* 空数组
*/ 
export const EMPTY_ARR = __DEV__ ? Object.freeze([]) : []
/**
 * 空函数
 */
export const NOOP = () => {}

/**
 * Always return false.
 * 总是返回false。
 */
export const NO = () => false
/**
 * 是否是 on 开头
 * @param key 
 * @returns 
 */
const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)
/**
 * 是否是数据监听器
 * @param key 
 * @returns 
 */
export const isModelListener = (key: string) => key.startsWith('onUpdate:')
/**
 * 扩展
 */
export const extend = Object.assign
/**
 * 删除数组中元素
 * @param arr 
 * @param el 
 */
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
/**
 * 是否是自身属性
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)
/**
 * 是否数组
 */
export const isArray = Array.isArray
/**
 * 是否是map
 * @param val 
 * @returns 
 */
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'
/**
 * 是否是set
 * @param val 
 * @returns 
 */
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'
/**
 * 是否是date
 * @param val 
 * @returns 
 */
export const isDate = (val: unknown): val is Date => val instanceof Date
/**
 * 是否是函数
 * @param val 
 * @returns 
 */
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
/**
 * 是否是字符串
 * @param val s
 * @returns 
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
/**
 * 
 * @param val 
 * @returns 
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
/**
 * 是否是对象
 * @param val 
 * @returns 
 */
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
/**
 * 是否是promise
 * @param val s
 * @returns 
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
/**
 * 对象转字符串
 */
export const objectToString = Object.prototype.toString
/**
 * 转字符串类型
 * @param value 
 * @returns 
 */
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)
/**
 * 
 * @param value 
 * @returns 
 */
export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}
// 是否是普通对象
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'
// 是否是整数key 
export const isIntegerKey = (key: unknown) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key
// 是否是保留属性
export const isReservedProp = /*#__PURE__*/ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ',key,ref,' +
    'onVnodeBeforeMount,onVnodeMounted,' +
    'onVnodeBeforeUpdate,onVnodeUpdated,' +
    'onVnodeBeforeUnmount,onVnodeUnmounted'
)
/**
 * 缓存字符串函数
 * @param fn 
 * @returns 
 */
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as any
}
// 短杆式命名 转  驼峰命名 
const camelizeRE = /-(\w)/g
/**
 * @private
 */
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})
// 驼峰命名 转 短杆式命名
const hyphenateRE = /\B([A-Z])/g
/**
 * @private
 */
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()
)
// 首字母大写
/**
 * @private
 */
export const capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)
// 获取处理程序的键
/**
 * @private
 */
export const toHandlerKey = cacheStringFunction((str: string) =>
  str ? `on${capitalize(str)}` : ``
)

// compare whether a value has changed, accounting for NaN.
// 比较某个值是否已更改，说明NaN
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)
/**
 * 调用数组中的函数
 * @param fns 
 * @param arg 
 */
export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg)
  }
}
/**
 * 给对象设置属性
 * @param obj 
 * @param key 
 * @param value 
 */
export const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    configurable: true, // 属性可以被改变
    enumerable: false, // 属性不可枚举
    value
  })
}
/**
 * 转数字
 * @param val 
 * @returns 
 */
export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
/**
 * 获取全局信息
 */
let _globalThis: any
export const getGlobalThis = (): any => {
  return (
    _globalThis ||
    (_globalThis =
      typeof globalThis !== 'undefined'
        ? globalThis
        : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
        ? global
        : {})
  )
}
