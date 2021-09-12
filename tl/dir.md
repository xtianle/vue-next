├── packages
│     ├── compiler-core
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── ast.ts
│     │     │     ├── babelUtils.ts
│     │     │     ├── codegen.ts
│     │     │     ├── compat
│     │     │     │     ├── compatConfig.ts
│     │     │     │     ├── transformFilter.ts
│     │     │     ├── compile.ts
│     │     │     ├── errors.ts
│     │     │     ├── index.ts
│     │     │     ├── options.ts
│     │     │     ├── parse.ts
│     │     │     ├── runtimeHelpers.ts
│     │     │     ├── transform.ts
│     │     │     ├── transforms
│     │     │     │     ├── hoistStatic.ts
│     │     │     │     ├── noopDirectiveTransform.ts
│     │     │     │     ├── transformElement.ts
│     │     │     │     ├── transformExpression.ts
│     │     │     │     ├── transformSlotOutlet.ts
│     │     │     │     ├── transformText.ts
│     │     │     │     ├── vBind.ts
│     │     │     │     ├── vFor.ts
│     │     │     │     ├── vIf.ts
│     │     │     │     ├── vMemo.ts
│     │     │     │     ├── vModel.ts
│     │     │     │     ├── vOn.ts
│     │     │     │     ├── vOnce.ts
│     │     │     │     ├── vSlot.ts
│     │     │     ├── utils.ts
│     │     │     ├── validateExpression.ts
│     │     ├── __tests__
│     │     │     ├── codegen.spec.ts
│     │     │     ├── compile.spec.ts
│     │     │     ├── parse.spec.ts
│     │     │     ├── scopeId.spec.ts
│     │     │     ├── testUtils.ts
│     │     │     ├── transform.spec.ts
│     │     │     ├── transforms
│     │     │     │     ├── hoistStatic.spec.ts
│     │     │     │     ├── noopDirectiveTransform.spec.ts
│     │     │     │     ├── transformElement.spec.ts
│     │     │     │     ├── transformExpressions.spec.ts
│     │     │     │     ├── transformSlotOutlet.spec.ts
│     │     │     │     ├── transformText.spec.ts
│     │     │     │     ├── vBind.spec.ts
│     │     │     │     ├── vFor.spec.ts
│     │     │     │     ├── vIf.spec.ts
│     │     │     │     ├── vMemo.spec.ts
│     │     │     │     ├── vModel.spec.ts
│     │     │     │     ├── vOn.spec.ts
│     │     │     │     ├── vOnce.spec.ts
│     │     │     │     ├── vSlot.spec.ts
│     │     │     │     ├── __snapshots__
│     │     │     │     │     ├── hoistStatic.spec.ts.snap
│     │     │     │     │     ├── transformExpressions.spec.ts.snap
│     │     │     │     │     ├── transformText.spec.ts.snap
│     │     │     │     │     ├── vFor.spec.ts.snap
│     │     │     │     │     ├── vIf.spec.ts.snap
│     │     │     │     │     ├── vMemo.spec.ts.snap
│     │     │     │     │     ├── vModel.spec.ts.snap
│     │     │     │     │     ├── vOnce.spec.ts.snap
│     │     │     │     │     ├── vSlot.spec.ts.snap
│     │     │     ├── utils.spec.ts
│     │     │     ├── __snapshots__
│     │     │     │     ├── codegen.spec.ts.snap
│     │     │     │     ├── compile.spec.ts.snap
│     │     │     │     ├── parse.spec.ts.snap
│     │     │     │     ├── scopeId.spec.ts.snap
│     ├── compiler-dom
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── decodeHtml.ts
│     │     │     ├── decodeHtmlBrowser.ts
│     │     │     ├── errors.ts
│     │     │     ├── index.ts
│     │     │     ├── namedChars.json
│     │     │     ├── parserOptions.ts
│     │     │     ├── runtimeHelpers.ts
│     │     │     ├── transforms
│     │     │     │     ├── ignoreSideEffectTags.ts
│     │     │     │     ├── stringifyStatic.ts
│     │     │     │     ├── transformStyle.ts
│     │     │     │     ├── vHtml.ts
│     │     │     │     ├── vModel.ts
│     │     │     │     ├── vOn.ts
│     │     │     │     ├── vShow.ts
│     │     │     │     ├── vText.ts
│     │     │     │     ├── warnTransitionChildren.ts
│     │     ├── __tests__
│     │     │     ├── decoderHtmlBrowser.spec.ts
│     │     │     ├── index.spec.ts
│     │     │     ├── parse.spec.ts
│     │     │     ├── transforms
│     │     │     │     ├── ignoreSideEffectTags.spec.ts
│     │     │     │     ├── stringifyStatic.spec.ts
│     │     │     │     ├── transformStyle.spec.ts
│     │     │     │     ├── vHtml.spec.ts
│     │     │     │     ├── vModel.spec.ts
│     │     │     │     ├── vOn.spec.ts
│     │     │     │     ├── vShow.spec.ts
│     │     │     │     ├── vText.spec.ts
│     │     │     │     ├── warnTransitionChildren.spec.ts
│     │     │     │     ├── __snapshots__
│     │     │     │     │     ├── vModel.spec.ts.snap
│     │     │     │     │     ├── vShow.spec.ts.snap
│     │     │     │     │     ├── warnTransitionChildren.spec.ts.snap
│     │     │     ├── __snapshots__
│     │     │     │     ├── index.spec.ts.snap
│     ├── compiler-sfc
│     │     ├── api-extractor.json
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── cache.ts
│     │     │     ├── compileScript.ts
│     │     │     ├── compileStyle.ts
│     │     │     ├── compileTemplate.ts
│     │     │     ├── cssVars.ts
│     │     │     ├── index.ts
│     │     │     ├── parse.ts
│     │     │     ├── rewriteDefault.ts
│     │     │     ├── shims.d.ts
│     │     │     ├── stylePluginScoped.ts
│     │     │     ├── stylePluginTrim.ts
│     │     │     ├── stylePreprocessors.ts
│     │     │     ├── templateTransformAssetUrl.ts
│     │     │     ├── templateTransformSrcset.ts
│     │     │     ├── templateUtils.ts
│     │     │     ├── warn.ts
│     │     ├── __tests__
│     │     │     ├── compileScript.spec.ts
│     │     │     ├── compileScriptRefTransform.spec.ts
│     │     │     ├── compileStyle.spec.ts
│     │     │     ├── compileTemplate.spec.ts
│     │     │     ├── cssVars.spec.ts
│     │     │     ├── fixture
│     │     │     │     ├── import.scss
│     │     │     ├── parse.spec.ts
│     │     │     ├── rewriteDefault.spec.ts
│     │     │     ├── templateTransformAssetUrl.spec.ts
│     │     │     ├── templateTransformSrcset.spec.ts
│     │     │     ├── templateUtils.spec.ts
│     │     │     ├── utils.ts
│     │     │     ├── __snapshots__
│     │     │     │     ├── compileScript.spec.ts.snap
│     │     │     │     ├── compileScriptRefTransform.spec.ts.snap
│     │     │     │     ├── compileTemplate.spec.ts.snap
│     │     │     │     ├── cssVars.spec.ts.snap
│     │     │     │     ├── templateTransformAssetUrl.spec.ts.snap
│     │     │     │     ├── templateTransformSrcset.spec.ts.snap
│     ├── compiler-ssr
│     │     ├── api-extractor.json
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── errors.ts
│     │     │     ├── index.ts
│     │     │     ├── runtimeHelpers.ts
│     │     │     ├── ssrCodegenTransform.ts
│     │     │     ├── transforms
│     │     │     │     ├── ssrInjectCssVars.ts
│     │     │     │     ├── ssrInjectFallthroughAttrs.ts
│     │     │     │     ├── ssrTransformComponent.ts
│     │     │     │     ├── ssrTransformElement.ts
│     │     │     │     ├── ssrTransformSlotOutlet.ts
│     │     │     │     ├── ssrTransformSuspense.ts
│     │     │     │     ├── ssrTransformTeleport.ts
│     │     │     │     ├── ssrTransformTransitionGroup.ts
│     │     │     │     ├── ssrVFor.ts
│     │     │     │     ├── ssrVIf.ts
│     │     │     │     ├── ssrVModel.ts
│     │     │     │     ├── ssrVShow.ts
│     │     ├── __tests__
│     │     │     ├── ssrComponent.spec.ts
│     │     │     ├── ssrElement.spec.ts
│     │     │     ├── ssrInjectCssVars.spec.ts
│     │     │     ├── ssrPortal.spec.ts
│     │     │     ├── ssrScopeId.spec.ts
│     │     │     ├── ssrSlotOutlet.spec.ts
│     │     │     ├── ssrSuspense.spec.ts
│     │     │     ├── ssrText.spec.ts
│     │     │     ├── ssrVFor.spec.ts
│     │     │     ├── ssrVIf.spec.ts
│     │     │     ├── ssrVModel.spec.ts
│     │     │     ├── ssrVShow.spec.ts
│     │     │     ├── utils.ts
│     ├── global.d.ts
│     ├── reactivity
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── baseHandlers.ts
│     │     │     ├── collectionHandlers.ts
│     │     │     ├── computed.ts
│     │     │     ├── deferredComputed.ts
│     │     │     ├── dep.ts
│     │     │     ├── effect.ts
│     │     │     ├── effectScope.ts
│     │     │     ├── index.ts
│     │     │     ├── operations.ts
│     │     │     ├── reactive.ts
│     │     │     ├── ref.ts
│     │     │     ├── warning.ts
│     │     ├── __tests__
│     │     │     ├── collections
│     │     │     │     ├── Map.spec.ts
│     │     │     │     ├── Set.spec.ts
│     │     │     │     ├── shallowReadonly.spec.ts
│     │     │     │     ├── WeakMap.spec.ts
│     │     │     │     ├── WeakSet.spec.ts
│     │     │     ├── computed.spec.ts
│     │     │     ├── deferredComputed.spec.ts
│     │     │     ├── effect.spec.ts
│     │     │     ├── effectScope.spec.ts
│     │     │     ├── reactive.spec.ts
│     │     │     ├── reactiveArray.spec.ts
│     │     │     ├── readonly.spec.ts
│     │     │     ├── ref.spec.ts
│     │     │     ├── shallowReactive.spec.ts
│     │     │     ├── shallowReadonly.spec.ts
│     ├── ref-transform
│     │     ├── api-extractor.json
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── babelPlugin.ts
│     │     │     ├── index.ts
│     │     │     ├── refTransform.ts
│     │     ├── __tests__
│     │     │     ├── refTransform.spec.ts
│     │     │     ├── __snapshots__
│     │     │     │     ├── refTransform.spec.ts.snap
│     ├── runtime-core
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── apiAsyncComponent.ts
│     │     │     ├── apiCreateApp.ts
│     │     │     ├── apiDefineComponent.ts
│     │     │     ├── apiInject.ts
│     │     │     ├── apiLifecycle.ts
│     │     │     ├── apiSetupHelpers.ts
│     │     │     ├── apiWatch.ts
│     │     │     ├── compat
│     │     │     │     ├── attrsFallthrough.ts
│     │     │     │     ├── compatConfig.ts
│     │     │     │     ├── component.ts
│     │     │     │     ├── componentAsync.ts
│     │     │     │     ├── componentFunctional.ts
│     │     │     │     ├── componentVModel.ts
│     │     │     │     ├── customDirective.ts
│     │     │     │     ├── data.ts
│     │     │     │     ├── global.ts
│     │     │     │     ├── globalConfig.ts
│     │     │     │     ├── instance.ts
│     │     │     │     ├── instanceChildren.ts
│     │     │     │     ├── instanceEventEmitter.ts
│     │     │     │     ├── instanceListeners.ts
│     │     │     │     ├── props.ts
│     │     │     │     ├── ref.ts
│     │     │     │     ├── renderFn.ts
│     │     │     │     ├── renderHelpers.ts
│     │     │     ├── component.ts
│     │     │     ├── componentEmits.ts
│     │     │     ├── componentOptions.ts
│     │     │     ├── componentProps.ts
│     │     │     ├── componentPublicInstance.ts
│     │     │     ├── componentRenderContext.ts
│     │     │     ├── componentRenderUtils.ts
│     │     │     ├── components
│     │     │     │     ├── BaseTransition.ts
│     │     │     │     ├── KeepAlive.ts
│     │     │     │     ├── Suspense.ts
│     │     │     │     ├── Teleport.ts
│     │     │     ├── componentSlots.ts
│     │     │     ├── customFormatter.ts
│     │     │     ├── devtools.ts
│     │     │     ├── directives.ts
│     │     │     ├── errorHandling.ts
│     │     │     ├── featureFlags.ts
│     │     │     ├── h.ts
│     │     │     ├── helpers
│     │     │     │     ├── createSlots.ts
│     │     │     │     ├── renderList.ts
│     │     │     │     ├── renderSlot.ts
│     │     │     │     ├── resolveAssets.ts
│     │     │     │     ├── toHandlers.ts
│     │     │     │     ├── typeUtils.ts
│     │     │     │     ├── useSsrContext.ts
│     │     │     │     ├── withMemo.ts
│     │     │     ├── hmr.ts
│     │     │     ├── hydration.ts
│     │     │     ├── index.ts
│     │     │     ├── profiling.ts
│     │     │     ├── renderer.ts
│     │     │     ├── scheduler.ts
│     │     │     ├── vnode.ts
│     │     │     ├── warning.ts
│     │     ├── types
│     │     │     ├── refBail.d.ts
│     │     │     ├── scriptSetupHelpers.d.ts
│     │     ├── __tests__
│     │     │     ├── apiAsyncComponent.spec.ts
│     │     │     ├── apiCreateApp.spec.ts
│     │     │     ├── apiExpose.spec.ts
│     │     │     ├── apiInject.spec.ts
│     │     │     ├── apiLifecycle.spec.ts
│     │     │     ├── apiOptions.spec.ts
│     │     │     ├── apiSetupContext.spec.ts
│     │     │     ├── apiSetupHelpers.spec.ts
│     │     │     ├── apiTemplateRef.spec.ts
│     │     │     ├── apiWatch.spec.ts
│     │     │     ├── componentEmits.spec.ts
│     │     │     ├── componentProps.spec.ts
│     │     │     ├── componentPublicInstance.spec.ts
│     │     │     ├── components
│     │     │     │     ├── BaseTransition.spec.ts
│     │     │     │     ├── KeepAlive.spec.ts
│     │     │     │     ├── Suspense.spec.ts
│     │     │     │     ├── Teleport.spec.ts
│     │     │     ├── componentSlots.spec.ts
│     │     │     ├── directives.spec.ts
│     │     │     ├── errorHandling.spec.ts
│     │     │     ├── h.spec.ts
│     │     │     ├── helpers
│     │     │     │     ├── createSlots.spec.ts
│     │     │     │     ├── renderList.spec.ts
│     │     │     │     ├── renderSlot.spec.ts
│     │     │     │     ├── resolveAssets.spec.ts
│     │     │     │     ├── toHandlers.spec.ts
│     │     │     │     ├── withMemo.spec.ts
│     │     │     ├── hmr.spec.ts
│     │     │     ├── hydration.spec.ts
│     │     │     ├── misc.spec.ts
│     │     │     ├── rendererAttrsFallthrough.spec.ts
│     │     │     ├── rendererChildren.spec.ts
│     │     │     ├── rendererComponent.spec.ts
│     │     │     ├── rendererElement.spec.ts
│     │     │     ├── rendererFragment.spec.ts
│     │     │     ├── rendererOptimizedMode.spec.ts
│     │     │     ├── scheduler.spec.ts
│     │     │     ├── scopeId.spec.ts
│     │     │     ├── vnode.spec.ts
│     │     │     ├── vnodeHooks.spec.ts
│     ├── runtime-dom
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── apiCustomElement.ts
│     │     │     ├── components
│     │     │     │     ├── Transition.ts
│     │     │     │     ├── TransitionGroup.ts
│     │     │     ├── directives
│     │     │     │     ├── vModel.ts
│     │     │     │     ├── vOn.ts
│     │     │     │     ├── vShow.ts
│     │     │     ├── helpers
│     │     │     │     ├── useCssModule.ts
│     │     │     │     ├── useCssVars.ts
│     │     │     ├── index.ts
│     │     │     ├── modules
│     │     │     │     ├── attrs.ts
│     │     │     │     ├── class.ts
│     │     │     │     ├── events.ts
│     │     │     │     ├── props.ts
│     │     │     │     ├── style.ts
│     │     │     ├── nodeOps.ts
│     │     │     ├── patchProp.ts
│     │     ├── types
│     │     │     ├── jsx.d.ts
│     │     │     ├── refBail.d.ts
│     │     ├── __tests__
│     │     │     ├── createApp.spec.ts
│     │     │     ├── customElement.spec.ts
│     │     │     ├── customizedBuiltIn.spec.ts
│     │     │     ├── directives
│     │     │     │     ├── vCloak.spec.ts
│     │     │     │     ├── vModel.spec.ts
│     │     │     │     ├── vOn.spec.ts
│     │     │     │     ├── vShow.spec.ts
│     │     │     ├── helpers
│     │     │     │     ├── useCssModule.spec.ts
│     │     │     │     ├── useCssVars.spec.ts
│     │     │     ├── nodeOps.spec.ts
│     │     │     ├── patchAttrs.spec.ts
│     │     │     ├── patchClass.spec.ts
│     │     │     ├── patchEvents.spec.ts
│     │     │     ├── patchProps.spec.ts
│     │     │     ├── patchStyle.spec.ts
│     │     │     ├── rendererStaticNode.spec.ts
│     ├── runtime-test
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── index.ts
│     │     │     ├── nodeOps.ts
│     │     │     ├── patchProp.ts
│     │     │     ├── serialize.ts
│     │     │     ├── triggerEvent.ts
│     │     ├── __tests__
│     │     │     ├── testRuntime.spec.ts
│     ├── server-renderer
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── helpers
│     │     │     │     ├── ssrCompile.ts
│     │     │     │     ├── ssrInterpolate.ts
│     │     │     │     ├── ssrRenderAttrs.ts
│     │     │     │     ├── ssrRenderComponent.ts
│     │     │     │     ├── ssrRenderList.ts
│     │     │     │     ├── ssrRenderSlot.ts
│     │     │     │     ├── ssrRenderSuspense.ts
│     │     │     │     ├── ssrRenderTeleport.ts
│     │     │     │     ├── ssrVModelHelpers.ts
│     │     │     ├── index.ts
│     │     │     ├── render.ts
│     │     │     ├── renderToStream.ts
│     │     │     ├── renderToString.ts
│     │     ├── __tests__
│     │     │     ├── render.spec.ts
│     │     │     ├── ssrAttrFallthrough.spec.ts
│     │     │     ├── ssrDirectives.spec.ts
│     │     │     ├── ssrDynamicComponent.spec.ts
│     │     │     ├── ssrInterpolate.spec.ts
│     │     │     ├── ssrRenderAttrs.spec.ts
│     │     │     ├── ssrRenderList.spec.ts
│     │     │     ├── ssrScopeId.spec.ts
│     │     │     ├── ssrSuspense.spec.ts
│     │     │     ├── ssrTeleport.spec.ts
│     │     │     ├── ssrVModelHelpers.spec.ts
│     │     │     ├── webStream.spec.ts
│     ├── sfc-playground
│     │     ├── index.html
│     │     ├── package.json
│     │     ├── public
│     │     │     ├── logo.svg
│     │     ├── src
│     │     │     ├── App.vue
│     │     │     ├── codemirror
│     │     │     │     ├── codemirror.css
│     │     │     │     ├── codemirror.ts
│     │     │     │     ├── CodeMirror.vue
│     │     │     ├── download
│     │     │     │     ├── download.ts
│     │     │     │     ├── template
│     │     │     │     │     ├── index.html
│     │     │     │     │     ├── main.js
│     │     │     │     │     ├── package.json
│     │     │     │     │     ├── README.md
│     │     │     │     │     ├── vite.config.js
│     │     │     ├── editor
│     │     │     │     ├── Editor.vue
│     │     │     │     ├── FileSelector.vue
│     │     │     ├── Header.vue
│     │     │     ├── main.ts
│     │     │     ├── Message.vue
│     │     │     ├── output
│     │     │     │     ├── moduleCompiler.ts
│     │     │     │     ├── Output.vue
│     │     │     │     ├── Preview.vue
│     │     │     │     ├── PreviewProxy.ts
│     │     │     │     ├── srcdoc.html
│     │     │     ├── SplitPane.vue
│     │     │     ├── store.ts
│     │     │     ├── transform.ts
│     │     │     ├── utils.ts
│     │     │     ├── vue-dev-proxy.ts
│     │     ├── vite.config.ts
│     ├── shared
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── codeframe.ts
│     │     │     ├── domAttrConfig.ts
│     │     │     ├── domTagConfig.ts
│     │     │     ├── escapeHtml.ts
│     │     │     ├── globalsWhitelist.ts
│     │     │     ├── index.ts
│     │     │     ├── looseEqual.ts
│     │     │     ├── makeMap.ts
│     │     │     ├── normalizeProp.ts
│     │     │     ├── patchFlags.ts
│     │     │     ├── shapeFlags.ts
│     │     │     ├── slotFlags.ts
│     │     │     ├── toDisplayString.ts
│     │     ├── __tests__
│     │     │     ├── codeframe.spec.ts
│     │     │     ├── escapeHtml.spec.ts
│     │     │     ├── looseEqual.spec.ts
│     │     │     ├── normalizeProp.spec.ts
│     │     │     ├── toDisplayString.spec.ts
│     │     │     ├── __snapshots__
│     │     │     │     ├── codeframe.spec.ts.snap
│     ├── size-check
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── index.ts
│     ├── template-explorer
│     │     ├── index.html
│     │     ├── local.html
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── index.ts
│     │     │     ├── options.ts
│     │     │     ├── theme.ts
│     │     ├── style.css
│     ├── vue
│     │     ├── api-extractor.json
│     │     ├── examples
│     │     │     ├── classic
│     │     │     │     ├── commits.html
│     │     │     │     ├── grid.html
│     │     │     │     ├── markdown.html
│     │     │     │     ├── svg.html
│     │     │     │     ├── todomvc.html
│     │     │     │     ├── tree.html
│     │     │     ├── composition
│     │     │     │     ├── commits.html
│     │     │     │     ├── grid.html
│     │     │     │     ├── markdown.html
│     │     │     │     ├── svg.html
│     │     │     │     ├── todomvc.html
│     │     │     │     ├── tree.html
│     │     │     ├── transition
│     │     │     │     ├── list.html
│     │     │     │     ├── modal.html
│     │     │     ├── __tests__
│     │     │     │     ├── commits.mock.ts
│     │     │     │     ├── commits.spec.ts
│     │     │     │     ├── grid.spec.ts
│     │     │     │     ├── markdown.spec.ts
│     │     │     │     ├── svg.spec.ts
│     │     │     │     ├── todomvc.spec.ts
│     │     │     │     ├── tree.spec.ts
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── ref-macros.d.ts
│     │     ├── src
│     │     │     ├── dev.ts
│     │     │     ├── index.ts
│     │     │     ├── runtime.ts
│     │     ├── __tests__
│     │     │     ├── e2eUtils.ts
│     │     │     ├── index.spec.ts
│     │     │     ├── runtimeCompilerOptions.spec.ts
│     │     │     ├── svgNamespace.spec.ts
│     │     │     ├── transition.html
│     │     │     ├── Transition.spec.ts
│     │     │     ├── TransitionGroup.spec.ts
│     ├── vue-compat
│     │     ├── api-extractor.json
│     │     ├── index.js
│     │     ├── LICENSE
│     │     ├── package.json
│     │     ├── README.md
│     │     ├── src
│     │     │     ├── createCompatVue.ts
│     │     │     ├── dev.ts
│     │     │     ├── esm-index.ts
│     │     │     ├── esm-runtime.ts
│     │     │     ├── index.ts
│     │     │     ├── runtime.ts
│     │     ├── __tests__
│     │     │     ├── compiler.spec.ts
│     │     │     ├── componentAsync.spec.ts
│     │     │     ├── componentFunctional.spec.ts
│     │     │     ├── componentVModel.spec.ts
│     │     │     ├── filters.spec.ts
│     │     │     ├── global.spec.ts
│     │     │     ├── globalConfig.spec.ts
│     │     │     ├── instance.spec.ts
│     │     │     ├── misc.spec.ts
│     │     │     ├── options.spec.ts
│     │     │     ├── refInfor.spec.ts
│     │     │     ├── renderFn.spec.ts
│     │     │     ├── utils.ts
├── README.md
├── rollup.config.js
├── scripts
│     ├── bootstrap.js
│     ├── build.js
│     ├── checkYarn.js
│     ├── dev.js
│     ├── release.js
│     ├── setupJestEnv.ts
│     ├── utils.js
│     ├── verifyCommit.js
├── test-dts
│     ├── component.test-d.ts
│     ├── componentTypeExtensions.test-d.tsx
│     ├── defineComponent.test-d.tsx
│     ├── functionalComponent.test-d.tsx
│     ├── h.test-d.ts
│     ├── index.d.ts
│     ├── inject.test-d.ts
│     ├── reactivity.test-d.ts
│     ├── README.md
│     ├── ref.test-d.ts
│     ├── refTransformMacros.test-d.ts
│     ├── setupHelpers.test-d.ts
│     ├── tsconfig.build.json
│     ├── tsconfig.json
│     ├── tsx.test-d.tsx
│     ├── watch.test-d.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── api-extractor.json
├── CHANGELOG.md
├── handleDir.js
├── jest.config.js
├── LICENSE
├── tsconfig.json
├── package.json
├── yarn.lock