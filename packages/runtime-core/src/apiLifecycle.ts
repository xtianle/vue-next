import {
  ComponentInternalInstance,
  currentInstance,
  isInSSRComponentSetup,
  LifecycleHooks,
  setCurrentInstance,
  unsetCurrentInstance
} from './component'
import { ComponentPublicInstance } from './componentPublicInstance'
import { callWithAsyncErrorHandling, ErrorTypeStrings } from './errorHandling'
import { warn } from './warning'
import { toHandlerKey } from '@vue/shared'
import { DebuggerEvent, pauseTracking, resetTracking } from '@vue/reactivity'

export { onActivated, onDeactivated } from './components/KeepAlive'
/**
 * 注入钩子
 * @param type 类型
 * @param hook 钩子函数
 * @param target 目标  组件内部实例
 * @param prepend 预编译
 * @returns
 */
export function injectHook(
  type: LifecycleHooks,
  hook: Function & { __weh?: Function },
  target: ComponentInternalInstance | null = currentInstance,
  prepend: boolean = false
): Function | undefined {
  if (target) {
    const hooks = target[type] || (target[type] = [])
    // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".
    // 缓存注入钩子的错误处理包装器，以便相同的钩子
    // 可以由计划程序正确地消除重复数据。“__weh”代表“带错误处理”。
    const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args: unknown[]) => {
        if (target.isUnmounted) {
          return
        }
        // disable tracking inside all lifecycle hooks
        // since they can potentially be called inside effects.
        pauseTracking()
        // Set currentInstance during hook invocation.
        // This assumes the hook does not synchronously trigger other hooks, which
        // can only be false when the user does something really funky.
        setCurrentInstance(target)
        const res = callWithAsyncErrorHandling(hook, target, type, args)
        unsetCurrentInstance()
        resetTracking()
        return res
      })
    // 预编译放在头部
    if (prepend) {
      hooks.unshift(wrappedHook)
    } else {
      // 非预编译放在尾部
      hooks.push(wrappedHook)
    }
    return wrappedHook
  } else if (__DEV__) {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''))
    warn(
      `${apiName} is called when there is no active component instance to be ` +
        `associated with. ` +
        `Lifecycle injection APIs can only be used during execution of setup().` +
        (__FEATURE_SUSPENSE__
          ? ` If you are using async setup(), make sure to register lifecycle ` +
            `hooks before the first await statement.`
          : ``)
    )
  }
}
/**
 * 创建钩子
 * @param lifecycle 生命周期
 * @returns 返回一个函数  该函数调用injectHook函数
 */
export const createHook =
  <T extends Function = () => any>(lifecycle: LifecycleHooks) =>
  (hook: T, target: ComponentInternalInstance | null = currentInstance) =>
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    // SSR期间，创建后生命周期注册是NOOP（服务器预取除外）
    (!isInSSRComponentSetup || lifecycle === LifecycleHooks.SERVER_PREFETCH) &&
    injectHook(lifecycle, hook, target)
// 挂载前
export const onBeforeMount = createHook(LifecycleHooks.BEFORE_MOUNT)
// 挂载
export const onMounted = createHook(LifecycleHooks.MOUNTED)
// 更新前
export const onBeforeUpdate = createHook(LifecycleHooks.BEFORE_UPDATE)
// 更新后
export const onUpdated = createHook(LifecycleHooks.UPDATED)
// 销毁前
export const onBeforeUnmount = createHook(LifecycleHooks.BEFORE_UNMOUNT)
// 销毁
export const onUnmounted = createHook(LifecycleHooks.UNMOUNTED)
// 服务器预读
export const onServerPrefetch = createHook(LifecycleHooks.SERVER_PREFETCH)
// 调试钩子
export type DebuggerHook = (e: DebuggerEvent) => void
// 触发渲染
export const onRenderTriggered = createHook<DebuggerHook>(
  LifecycleHooks.RENDER_TRIGGERED
)
// 在渲染跟踪上
export const onRenderTracked = createHook<DebuggerHook>(
  LifecycleHooks.RENDER_TRACKED
)
/**
 * 错误捕获的钩子
 */
export type ErrorCapturedHook<TError = unknown> = (
  err: TError,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
/**
 * 错误捕获
 * @param hook
 * @param target
 */
export function onErrorCaptured<TError = Error>(
  hook: ErrorCapturedHook<TError>,
  target: ComponentInternalInstance | null = currentInstance
) {
  injectHook(LifecycleHooks.ERROR_CAPTURED, hook, target)
}
