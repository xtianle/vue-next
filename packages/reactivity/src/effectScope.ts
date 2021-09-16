import { ReactiveEffect } from './effect'
import { warn } from './warning'
// 活动的影响范围
let activeEffectScope: EffectScope | undefined
// 影响范围的堆栈
const effectScopeStack: EffectScope[] = []
/**
 * 影响范围
 */
export class EffectScope {
  active = true // 是否是活动的
  effects: ReactiveEffect[] = [] // 影响
  cleanups: (() => void)[] = [] // 清理

  parent: EffectScope | undefined // 父级
  scopes: EffectScope[] | undefined // 范围
  /**
   * track a child scope's index in its parent's scopes array for optimized
   * removal
   */
  private index: number | undefined
  /**
   * 
   * @param detached 独立的
   */
  constructor(detached = false) {
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope
      this.index =
        (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1
    }
  }

  run<T>(fn: () => T): T | undefined {
    if (this.active) {
      try {
        this.on()
        return fn()
      } finally {
        this.off()
      }
    } else if (__DEV__) {
      warn(`cannot run an inactive effect scope.`)
    }
  }
  // 把当前影响推入到影响堆里面
  on() {
    if (this.active) {
      effectScopeStack.push(this)
      activeEffectScope = this
    }
  }
  // 把当前影响从影响堆中移出
  off() {
    if (this.active) {
      effectScopeStack.pop()
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1]
    }
  }
  // 停止
  stop(fromParent?: boolean) {
    if (this.active) {
      this.effects.forEach(e => e.stop())
      this.cleanups.forEach(cleanup => cleanup())
      if (this.scopes) {
        this.scopes.forEach(e => e.stop(true))
      }
      // nested scope, dereference from parent to avoid memory leaks
      if (this.parent && !fromParent) {
        // optimized O(1) removal
        const last = this.parent.scopes!.pop()
        if (last && last !== this) {
          this.parent.scopes![this.index!] = last
          last.index = this.index!
        }
      }
      this.active = false
    }
  }
}
/**
 * 影响范围
 * @param detached 
 * @returns 
 */
export function effectScope(detached?: boolean) {
  return new EffectScope(detached)
}
/**
 * 记录响应的范围
 * @param effect
 * @param scope
 */
export function recordEffectScope(
  effect: ReactiveEffect,
  scope?: EffectScope | null
) {
  scope = scope || activeEffectScope
  if (scope && scope.active) {
    scope.effects.push(effect)
  }
}
/**
 * 获取当前的范围
 * @returns
 */
export function getCurrentScope() {
  return activeEffectScope
}
/**
 * 监听范围的处理
 * @param fn
 */
export function onScopeDispose(fn: () => void) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn)
  } else if (__DEV__) {
    warn(
      `onScopeDispose() is called when there is no active effect scope` +
        ` to be associated with.`
    )
  }
}
