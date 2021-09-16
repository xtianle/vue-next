import { ReactiveEffect, trackOpBit } from './effect'

export type Dep = Set<ReactiveEffect> & TrackedMarkers

/**
 * wasTracked and newTracked maintain the status for several levels of effect
 * tracking recursion. One bit per level is used to define wheter the dependency
 * was/is tracked.
 *
 * wasTracked和newTracked在几个级别上保持状态
 * 跟踪递归。每级一位用于定义依赖关系被跟踪。
 */
type TrackedMarkers = {
  /**
   * wasTracked 被跟踪
   */
  w: number
  /**
   * newTracked 新的跟踪
   */
  n: number
}
/**
 * 创建dep
 * @param effects
 * @returns
 */
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep = new Set<ReactiveEffect>(effects) as Dep
  dep.w = 0
  dep.n = 0
  return dep
}
/**
 * 被跟踪
 * @param dep 
 * @returns 
 */
export const wasTracked = (dep: Dep): boolean => (dep.w & trackOpBit) > 0
/**
 * 新跟踪
 * @param dep 
 * @returns 
 */
export const newTracked = (dep: Dep): boolean => (dep.n & trackOpBit) > 0
/**
 * 初始化dep标记
 * @param param0 
 */
export const initDepMarkers = ({ deps }: ReactiveEffect) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit // set was tracked
    }
  }
}
/**
 * 确定dep标记
 * @param effect 
 */
export const finalizeDepMarkers = (effect: ReactiveEffect) => {
  const { deps } = effect
  if (deps.length) {
    let ptr = 0
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i]
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect)
      } else {
        deps[ptr++] = dep
      }
      // clear bits
      // 清除位置
      dep.w &= ~trackOpBit
      dep.n &= ~trackOpBit
    }
    deps.length = ptr
  }
}
