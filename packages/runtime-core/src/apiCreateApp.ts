import {
  ConcreteComponent,
  Data,
  validateComponentName,
  Component,
  ComponentInternalInstance
} from './component'
import {
  ComponentOptions,
  MergedComponentOptions,
  RuntimeCompilerOptions
} from './componentOptions'
import { ComponentPublicInstance } from './componentPublicInstance'
import { Directive, validateDirectiveName } from './directives'
import { RootRenderFunction } from './renderer'
import { InjectionKey } from './apiInject'
import { warn } from './warning'
import { createVNode, cloneVNode, VNode } from './vnode'
import { RootHydrateFunction } from './hydration'
import { devtoolsInitApp, devtoolsUnmountApp } from './devtools'
import { isFunction, NO, isObject } from '@vue/shared'
import { version } from '.'
import { installAppCompatProperties } from './compat/global'
import { NormalizedPropsOptions } from './componentProps'
import { ObjectEmitsOptions } from './componentEmits'

// app(vue)实例 接口
export interface App<HostElement = any> {
  version: string
  config: AppConfig
  use(plugin: Plugin, ...options: any[]): this
  mixin(mixin: ComponentOptions): this
  component(name: string): Component | undefined
  component(name: string, component: Component): this
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
  mount(
    rootContainer: HostElement | string,
    isHydrate?: boolean,
    isSVG?: boolean
  ): ComponentPublicInstance
  unmount(): void
  provide<T>(key: InjectionKey<T> | string, value: T): this

  // internal, but we need to expose these for the server-renderer and devtools
  _uid: number
  _component: ConcreteComponent
  _props: Data | null
  _container: HostElement | null
  _context: AppContext
  _instance: ComponentInternalInstance | null

  /**
   * v2 compat only
   */
  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this

  /**
   * @internal v3 compat only
   */
  _createRoot?(options: ComponentOptions): ComponentPublicInstance
}

export type OptionMergeFunction = (to: unknown, from: unknown) => any

// app 配置接口
export interface AppConfig {
  // @private
  readonly isNativeTag?: (tag: string) => boolean

  performance: boolean
  optionMergeStrategies: Record<string, OptionMergeFunction>
  globalProperties: Record<string, any>
  errorHandler?: (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => void
  warnHandler?: (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => void

  /**
   * Options to pass to @vue/compiler-dom.
   * Only supported in runtime compiler build.
   */
  compilerOptions: RuntimeCompilerOptions

  /**
   * @deprecated use config.compilerOptions.isCustomElement
   */
  isCustomElement?: (tag: string) => boolean

  /**
   * Temporary config for opt-in to unwrap injected refs.
   * TODO deprecate in 3.3
   */
  unwrapInjectedRef?: boolean
}

// app 上下文
export interface AppContext {
  app: App // for devtools
  config: AppConfig
  mixins: ComponentOptions[]
  components: Record<string, Component>
  directives: Record<string, Directive>
  provides: Record<string | symbol, any>

  /**
   * Cache for merged/normalized component options
   * Each app instance has its own cache because app-level global mixins and
   * optionMergeStrategies can affect merge behavior.
   * @internal
   */
  optionsCache: WeakMap<ComponentOptions, MergedComponentOptions>
  /**
   * Cache for normalized props options
   * 标准化道具选项的缓存
   * @internal
   */
  propsCache: WeakMap<ConcreteComponent, NormalizedPropsOptions>
  /**
   * Cache for normalized emits options
   * 标准化发射选项的缓存
   * @internal
   */
  emitsCache: WeakMap<ConcreteComponent, ObjectEmitsOptions | null>
  /**
   * HMR only
   * @internal
   */
  reload?: () => void
  /**
   * v2 compat only
   * @internal
   */
  filters?: Record<string, Function>
}

// 安装函数插件
type PluginInstallFunction = (app: App, ...options: any[]) => any

// 插件
export type Plugin =
  | (PluginInstallFunction & { install?: PluginInstallFunction })
  | {
      install: PluginInstallFunction
    }

/**
 * 创建app上下文
 * @returns
 */
export function createAppContext(): AppContext {
  return {
    // app实例
    app: null as any,
    // 配置
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    // 混合
    mixins: [],
    // 组件
    components: {},
    // 指令
    directives: {},
    // 暴露
    provides: Object.create(null),
    // 缓存
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}

/**
 * 创建app函数
 */
export type CreateAppFunction<HostElement> = (
  rootComponent: Component,
  rootProps?: Data | null
) => App<HostElement>

// 唯一标识
let uid = 0

/**
 * 创建app Api
 * @param render 渲染函数
 * @param hydrate 与服务器渲染相关参数
 * hydrate 描述的是 ReactDOM 复用 ReactDOMServer 服务端渲染的内容时尽可能保留结构，
 * 并补充事件绑定等 Client 特有内容的过程。
 * @returns
 */
export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  /**
   * 创建app
   * @param rootComponent 根组件
   * @param rootProps 根props
   * @returns
   */
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }
    // 上下文
    const context = createAppContext()
    // 已经安装的插件
    const installedPlugins = new Set()
    // 是否挂载
    let isMounted = false
    // 赋值实例内容
    const app: App = (context.app = {
      // 私有属性
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,

      version,

      get config() {
        return context.config
      },

      set config(v) {
        if (__DEV__) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          )
        }
      },
      /**
       * 使用插件的方法
       * @param plugin
       * @param options
       * @returns
       */
      use(plugin: Plugin, ...options: any[]) {
        if (installedPlugins.has(plugin)) {
          __DEV__ && warn(`Plugin has already been applied to target app.`)
        } else if (plugin && isFunction(plugin.install)) {
          // 插件为一个对象 其中有一个install函数
          installedPlugins.add(plugin)
          plugin.install(app, ...options)
        } else if (isFunction(plugin)) {
          // 插件为一个函数
          installedPlugins.add(plugin)
          plugin(app, ...options)
        } else if (__DEV__) {
          warn(
            `A plugin must either be a function or an object with an "install" ` +
              `function.`
          )
        }
        // 返回当前实例  方便后面方法的链式调用
        return app
      },
      /**
       * 混合
       * @param mixin
       * @returns
       */
      mixin(mixin: ComponentOptions) {
        if (__FEATURE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin)
          } else if (__DEV__) {
            warn(
              'Mixin has already been applied to target app' +
                (mixin.name ? `: ${mixin.name}` : '')
            )
          }
        } else if (__DEV__) {
          warn('Mixins are only available in builds supporting Options API')
        }
        return app
      },
      /**
       * 组件
       * @param name 组件名称
       * @param component 组件内容
       * @returns
       */
      component(name: string, component?: Component): any {
        if (__DEV__) {
          // 验证组件名称
          validateComponentName(name, context.config)
        }
        if (!component) {
          return context.components[name]
        }
        if (__DEV__ && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`)
        }
        context.components[name] = component
        return app
      },
      /**
       * 指令
       * @param name 指令名称
       * @param directive 指令内容
       * @returns
       */
      directive(name: string, directive?: Directive) {
        if (__DEV__) {
          // 验证指令名称
          validateDirectiveName(name)
        }

        if (!directive) {
          return context.directives[name] as any
        }
        if (__DEV__ && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`)
        }
        context.directives[name] = directive
        return app
      },
      /**
       * 挂载的方法==》整个程序的调用入口
       * @param rootContainer 根容器
       * @param isHydrate
       * @param isSVG
       * @returns
       */
      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        // 开始挂载
        if (!isMounted) {
          // 创建vnode
          const vnode = createVNode(
            rootComponent as ConcreteComponent,
            rootProps
          )
          // store app context on the root VNode.
          // this will be set on the root instance on initial mount.
          // 在根VNode上存储应用程序上下文。
          // 这将在初始装载时的根实例上设置。
          vnode.appContext = context

          // HMR root reload
          // 根重新加载
          if (__DEV__) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG)
            }
          }

          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, isSVG)
          }
          // 挂载成功
          isMounted = true
          // 给应用程序赋值容器
          app._container = rootContainer
          // for devtools and telemetry
          // 用于开发工具和遥测
          ;(rootContainer as any).__vue_app__ = app
          // 开发或这devTool使用
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = vnode.component
            devtoolsInitApp(app, version)
          }

          return vnode.component!.proxy
        } else if (__DEV__) {
          warn(
            `App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``
          )
        }
      },
      /**
       * 卸载的方法
       */
      unmount() {
        // 开始卸载
        if (isMounted) {
          render(null, app._container)
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = null
            devtoolsUnmountApp(app)
          }
          delete app._container.__vue_app__
        } else if (__DEV__) {
          warn(`Cannot unmount an app that is not mounted.`)
        }
      },
      /**
       * 提供
       * @param key
       * @param value
       * @returns
       */
      provide(key, value) {
        if (__DEV__ && (key as string | symbol) in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". ` +
              `It will be overwritten with the new value.`
          )
        }
        // TypeScript doesn't allow symbols as index type
        // https://github.com/Microsoft/TypeScript/issues/24587
        context.provides[key as string] = value

        return app
      }
    })

    if (__COMPAT__) {
      // 安装应用程序兼容性属性
      installAppCompatProperties(app, context, render)
    }

    return app
  }
}
