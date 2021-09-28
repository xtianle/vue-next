import { isString } from '@vue/shared'
import { ForParseResult } from './transforms/vFor'
import {
  RENDER_SLOT,
  CREATE_SLOTS,
  RENDER_LIST,
  OPEN_BLOCK,
  FRAGMENT,
  WITH_DIRECTIVES,
  WITH_MEMO
} from './runtimeHelpers'
import { PropsExpression } from './transforms/transformElement'
import { ImportItem, TransformContext } from './transform'
import { getVNodeBlockHelper, getVNodeHelper } from './utils'

// Vue template is a platform-agnostic superset of HTML (syntax only).
// More namespaces like SVG and MathML are declared by platform specific
// compilers.
export type Namespace = number

export const enum Namespaces {
  HTML
}

export const enum NodeTypes {
  ROOT, // 根节点
  ELEMENT, // 元素
  TEXT, // 文本
  COMMENT, // 注释
  SIMPLE_EXPRESSION, // 简单表达式
  INTERPOLATION, // 插值
  ATTRIBUTE, // 属性
  DIRECTIVE, // 指令
  // containers
  COMPOUND_EXPRESSION, // 复合表达式
  IF, // if
  IF_BRANCH, // if分支
  FOR, // for
  TEXT_CALL, // 调用文本
  // codegen
  VNODE_CALL, // 调用vnode
  JS_CALL_EXPRESSION, // js 调用表达式
  JS_OBJECT_EXPRESSION, // js 对象表达式
  JS_PROPERTY, // js 属性
  JS_ARRAY_EXPRESSION, // js 数组表达式
  JS_FUNCTION_EXPRESSION, // js 函数表达式
  JS_CONDITIONAL_EXPRESSION, // js 条件表达式
  JS_CACHE_EXPRESSION, // js 缓存表达式

  // ssr codegen
  JS_BLOCK_STATEMENT, // js 块语句
  JS_TEMPLATE_LITERAL, // js 模板文本
  JS_IF_STATEMENT, // js if语句
  JS_ASSIGNMENT_EXPRESSION, // js 参数表达式
  JS_SEQUENCE_EXPRESSION, // js 队列表达式
  JS_RETURN_STATEMENT // js 返回语句
}

export const enum ElementTypes {
  ELEMENT, // 元素
  COMPONENT, // 注释
  SLOT, // 插槽
  TEMPLATE // 模板
}

/**
 * 节点
 */
export interface Node {
  type: NodeTypes
  loc: SourceLocation
}

// The node's range. The `start` is inclusive and `end` is exclusive.
// [start, end)
/**
 * 源位置
 */
export interface SourceLocation {
  start: Position
  end: Position
  source: string
}

/**
 * 位置
 */
export interface Position {
  offset: number // from start of file
  line: number
  column: number
}

/**
 * 父级节点
 */
export type ParentNode = RootNode | ElementNode | IfBranchNode | ForNode

/**
 * 节点表达式
 */
export type ExpressionNode = SimpleExpressionNode | CompoundExpressionNode

/**
 * 模板子节点
 */
export type TemplateChildNode =
  | ElementNode
  | InterpolationNode
  | CompoundExpressionNode
  | TextNode
  | CommentNode
  | IfNode
  | IfBranchNode
  | ForNode
  | TextCallNode

/**
 * 根节点
 */
export interface RootNode extends Node {
  type: NodeTypes.ROOT
  children: TemplateChildNode[]
  helpers: symbol[]
  components: string[]
  directives: string[]
  hoists: (JSChildNode | null)[]
  imports: ImportItem[]
  cached: number
  temps: number
  ssrHelpers?: symbol[]
  codegenNode?: TemplateChildNode | JSChildNode | BlockStatement

  // v2 compat only
  filters?: string[]
}

/**
 * 元素节点
 */
export type ElementNode =
  | PlainElementNode
  | ComponentNode
  | SlotOutletNode
  | TemplateNode

/**
 *基础元素节点
 */
export interface BaseElementNode extends Node {
  type: NodeTypes.ELEMENT
  ns: Namespace
  tag: string
  tagType: ElementTypes
  isSelfClosing: boolean
  props: Array<AttributeNode | DirectiveNode>
  children: TemplateChildNode[]
}

/**
 * 普通元素节点
 */
export interface PlainElementNode extends BaseElementNode {
  tagType: ElementTypes.ELEMENT
  codegenNode:
    | VNodeCall
    | SimpleExpressionNode // when hoisted
    | CacheExpression // when cached by v-once
    | MemoExpression // when cached by v-memo
    | undefined
  ssrCodegenNode?: TemplateLiteral
}

/**
 * 组件节点
 */
export interface ComponentNode extends BaseElementNode {
  tagType: ElementTypes.COMPONENT
  codegenNode:
    | VNodeCall
    | CacheExpression // when cached by v-once
    | MemoExpression // when cached by v-memo
    | undefined
  ssrCodegenNode?: CallExpression
}

/**
 * 插槽输出节点
 */
export interface SlotOutletNode extends BaseElementNode {
  tagType: ElementTypes.SLOT
  codegenNode:
    | RenderSlotCall
    | CacheExpression // when cached by v-once
    | undefined
  ssrCodegenNode?: CallExpression
}

/**
 * 模板节点
 */
export interface TemplateNode extends BaseElementNode {
  tagType: ElementTypes.TEMPLATE
  // TemplateNode is a container type that always gets compiled away
  codegenNode: undefined
}

/**
 * 文本节点
 */
export interface TextNode extends Node {
  type: NodeTypes.TEXT
  content: string
}

/**
 * 注释节点
 */
export interface CommentNode extends Node {
  type: NodeTypes.COMMENT
  content: string
}

/**
 * 属性节点
 */
export interface AttributeNode extends Node {
  type: NodeTypes.ATTRIBUTE
  name: string
  value: TextNode | undefined
}

/**
 * 指令节点
 */
export interface DirectiveNode extends Node {
  type: NodeTypes.DIRECTIVE
  name: string
  exp: ExpressionNode | undefined
  arg: ExpressionNode | undefined
  modifiers: string[]
  /**
   * optional property to cache the expression parse result for v-for
   */
  parseResult?: ForParseResult
}

/**
 * Static types have several levels.
 * Higher levels implies lower levels. e.g. a node that can be stringified
 * can always be hoisted and skipped for patch.
 */
/**
 * 静态类型
 */
export const enum ConstantTypes {
  NOT_CONSTANT = 0,
  CAN_SKIP_PATCH,
  CAN_HOIST,
  CAN_STRINGIFY
}

/**
 * 简单表达式节点
 */
export interface SimpleExpressionNode extends Node {
  type: NodeTypes.SIMPLE_EXPRESSION
  content: string
  isStatic: boolean
  constType: ConstantTypes
  /**
   * Indicates this is an identifier for a hoist vnode call and points to the
   * hoisted node.
   */
  hoisted?: JSChildNode
  /**
   * an expression parsed as the params of a function will track
   * the identifiers declared inside the function body.
   */
  identifiers?: string[]
  isHandlerKey?: boolean
}

/**
 * 插值节点
 */
export interface InterpolationNode extends Node {
  type: NodeTypes.INTERPOLATION
  content: ExpressionNode
}

/**
 * 复杂表达式节点
 */
export interface CompoundExpressionNode extends Node {
  type: NodeTypes.COMPOUND_EXPRESSION
  children: (
    | SimpleExpressionNode
    | CompoundExpressionNode
    | InterpolationNode
    | TextNode
    | string
    | symbol
  )[]

  /**
   * an expression parsed as the params of a function will track
   * the identifiers declared inside the function body.
   */
  identifiers?: string[]
  isHandlerKey?: boolean
}

/**
 * if节点
 */
export interface IfNode extends Node {
  type: NodeTypes.IF
  branches: IfBranchNode[]
  codegenNode?: IfConditionalExpression | CacheExpression // <div v-if v-once>
}

/**
 * if分支节点
 */
export interface IfBranchNode extends Node {
  type: NodeTypes.IF_BRANCH
  condition: ExpressionNode | undefined // else
  children: TemplateChildNode[]
  userKey?: AttributeNode | DirectiveNode
}

/**
 * for节点
 */
export interface ForNode extends Node {
  type: NodeTypes.FOR
  source: ExpressionNode
  valueAlias: ExpressionNode | undefined
  keyAlias: ExpressionNode | undefined
  objectIndexAlias: ExpressionNode | undefined
  parseResult: ForParseResult
  children: TemplateChildNode[]
  codegenNode?: ForCodegenNode
}

/**
 * 文本调用节点
 */
export interface TextCallNode extends Node {
  type: NodeTypes.TEXT_CALL
  content: TextNode | InterpolationNode | CompoundExpressionNode
  codegenNode: CallExpression | SimpleExpressionNode // when hoisted
}

/**
 * 模板文本子节点
 */
export type TemplateTextChildNode =
  | TextNode
  | InterpolationNode
  | CompoundExpressionNode

/**
 * vnode 调用
 */
export interface VNodeCall extends Node {
  type: NodeTypes.VNODE_CALL
  tag: string | symbol | CallExpression
  props: PropsExpression | undefined
  children:
    | TemplateChildNode[] // multiple children
    | TemplateTextChildNode // single text child
    | SlotsExpression // component slots
    | ForRenderListExpression // v-for fragment call
    | SimpleExpressionNode // hoisted
    | undefined
  patchFlag: string | undefined
  dynamicProps: string | SimpleExpressionNode | undefined
  directives: DirectiveArguments | undefined
  isBlock: boolean
  disableTracking: boolean
  isComponent: boolean
}

// JS Node Types ---------------------------------------------------------------
// js节点类型-------------------------------------------------

// We also include a number of JavaScript AST nodes for code generation.
// The AST is an intentionally minimal subset just to meet the exact needs of
// Vue render function generation.

/**
 * js子节点
 */
export type JSChildNode =
  | VNodeCall
  | CallExpression
  | ObjectExpression
  | ArrayExpression
  | ExpressionNode
  | FunctionExpression
  | ConditionalExpression
  | CacheExpression
  | AssignmentExpression
  | SequenceExpression

/**
 * 调用表达式
 */
export interface CallExpression extends Node {
  type: NodeTypes.JS_CALL_EXPRESSION
  callee: string | symbol
  arguments: (
    | string
    | symbol
    | JSChildNode
    | SSRCodegenNode
    | TemplateChildNode
    | TemplateChildNode[]
  )[]
}

/**
 * 对象表达式
 */
export interface ObjectExpression extends Node {
  type: NodeTypes.JS_OBJECT_EXPRESSION
  properties: Array<Property>
}

/**
 * 属性
 */
export interface Property extends Node {
  type: NodeTypes.JS_PROPERTY
  key: ExpressionNode
  value: JSChildNode
}

/**
 * 数组表达式
 */
export interface ArrayExpression extends Node {
  type: NodeTypes.JS_ARRAY_EXPRESSION
  elements: Array<string | Node>
}

/**
 * 函数表达式
 */
export interface FunctionExpression extends Node {
  type: NodeTypes.JS_FUNCTION_EXPRESSION
  params: ExpressionNode | string | (ExpressionNode | string)[] | undefined
  returns?: TemplateChildNode | TemplateChildNode[] | JSChildNode
  body?: BlockStatement | IfStatement
  newline: boolean
  /**
   * This flag is for codegen to determine whether it needs to generate the
   * withScopeId() wrapper
   */
  isSlot: boolean
  /**
   * __COMPAT__ only, indicates a slot function that should be excluded from
   * the legacy $scopedSlots instance property.
   */
  isNonScopedSlot?: boolean
}

/**
 * 条件节点
 */
export interface ConditionalExpression extends Node {
  type: NodeTypes.JS_CONDITIONAL_EXPRESSION
  test: JSChildNode
  consequent: JSChildNode
  alternate: JSChildNode
  newline: boolean
}

/**
 * 缓存节点
 */
export interface CacheExpression extends Node {
  type: NodeTypes.JS_CACHE_EXPRESSION
  index: number
  value: JSChildNode
  isVNode: boolean
}

/**
 * 备忘录表达式
 */
export interface MemoExpression extends CallExpression {
  callee: typeof WITH_MEMO
  arguments: [ExpressionNode, MemoFactory, string, string]
}

/**
 * 备忘录工厂
 */
interface MemoFactory extends FunctionExpression {
  returns: BlockCodegenNode
}

// SSR-specific Node Types -----------------------------------------------------
// 特定于SSR的节点类型

/**
 * srr 编码节点
 */
export type SSRCodegenNode =
  | BlockStatement
  | TemplateLiteral
  | IfStatement
  | AssignmentExpression
  | ReturnStatement
  | SequenceExpression

/**
 * 块语句
 */
export interface BlockStatement extends Node {
  type: NodeTypes.JS_BLOCK_STATEMENT
  body: (JSChildNode | IfStatement)[]
}

/**
 * 模板文本
 */
export interface TemplateLiteral extends Node {
  type: NodeTypes.JS_TEMPLATE_LITERAL
  elements: (string | JSChildNode)[]
}

/**
 * if 语句
 */
export interface IfStatement extends Node {
  type: NodeTypes.JS_IF_STATEMENT
  test: ExpressionNode
  consequent: BlockStatement
  alternate: IfStatement | BlockStatement | ReturnStatement | undefined
}

/**
 * 参数表达式
 */
export interface AssignmentExpression extends Node {
  type: NodeTypes.JS_ASSIGNMENT_EXPRESSION
  left: SimpleExpressionNode
  right: JSChildNode
}

/**
 * 序列表达式
 */
export interface SequenceExpression extends Node {
  type: NodeTypes.JS_SEQUENCE_EXPRESSION
  expressions: JSChildNode[]
}

/**
 * 返回语句
 */
export interface ReturnStatement extends Node {
  type: NodeTypes.JS_RETURN_STATEMENT
  returns: TemplateChildNode | TemplateChildNode[] | JSChildNode
}

// Codegen Node Types ----------------------------------------------------------

/**
 * 指令参数
 */
export interface DirectiveArguments extends ArrayExpression {
  elements: DirectiveArgumentNode[]
}

/**
 * 指令参数节点
 */
export interface DirectiveArgumentNode extends ArrayExpression {
  elements: // dir, exp, arg, modifiers
  | [string]
    | [string, ExpressionNode]
    | [string, ExpressionNode, ExpressionNode]
    | [string, ExpressionNode, ExpressionNode, ObjectExpression]
}

// renderSlot(...)
/**
 * 渲染插槽调用
 */
export interface RenderSlotCall extends CallExpression {
  callee: typeof RENDER_SLOT
  arguments: // $slots, name, props, fallback
  | [string, string | ExpressionNode]
    | [string, string | ExpressionNode, PropsExpression]
    | [
        string,
        string | ExpressionNode,
        PropsExpression | '{}',
        TemplateChildNode[]
      ]
}

/**
 * 插槽表达式
 */
export type SlotsExpression = SlotsObjectExpression | DynamicSlotsExpression

// { foo: () => [...] }
/**
 * 插槽对象表达式
 */
export interface SlotsObjectExpression extends ObjectExpression {
  properties: SlotsObjectProperty[]
}

/**
 * 插槽对象属性
 */
export interface SlotsObjectProperty extends Property {
  value: SlotFunctionExpression
}

/**
 * 插槽函数表达式
 */
export interface SlotFunctionExpression extends FunctionExpression {
  returns: TemplateChildNode[]
}

// createSlots({ ... }, [
//    foo ? () => [] : undefined,
//    renderList(list, i => () => [i])
// ])
/**
 * 动态插槽表达式
 */
export interface DynamicSlotsExpression extends CallExpression {
  callee: typeof CREATE_SLOTS
  arguments: [SlotsObjectExpression, DynamicSlotEntries]
}

/**
 * 动态插槽入口
 */
export interface DynamicSlotEntries extends ArrayExpression {
  elements: (ConditionalDynamicSlotNode | ListDynamicSlotNode)[]
}

/**
 * 条件动态插槽节点
 */
export interface ConditionalDynamicSlotNode extends ConditionalExpression {
  consequent: DynamicSlotNode
  alternate: DynamicSlotNode | SimpleExpressionNode
}

/**
 * 列表动态插槽节点
 */
export interface ListDynamicSlotNode extends CallExpression {
  callee: typeof RENDER_LIST
  arguments: [ExpressionNode, ListDynamicSlotIterator]
}

/**
 * 列表动态插槽迭代器
 */
export interface ListDynamicSlotIterator extends FunctionExpression {
  returns: DynamicSlotNode
}

/**
 * 动态插槽节点
 */
export interface DynamicSlotNode extends ObjectExpression {
  properties: [Property, DynamicSlotFnProperty]
}

/**
 * 动态插槽函数属性
 */
export interface DynamicSlotFnProperty extends Property {
  value: SlotFunctionExpression
}

/**
 * 块编码节点
 */
export type BlockCodegenNode = VNodeCall | RenderSlotCall

/**
 * if 条件表达式
 */
export interface IfConditionalExpression extends ConditionalExpression {
  consequent: BlockCodegenNode | MemoExpression
  alternate: BlockCodegenNode | IfConditionalExpression | MemoExpression
}

/**
 * for 编码节点
 */
export interface ForCodegenNode extends VNodeCall {
  isBlock: true
  tag: typeof FRAGMENT
  props: undefined
  children: ForRenderListExpression
  patchFlag: string
  disableTracking: boolean
}

/**
 * for渲染列表表达式
 */
export interface ForRenderListExpression extends CallExpression {
  callee: typeof RENDER_LIST
  arguments: [ExpressionNode, ForIteratorExpression]
}

/**
 * for 迭代器表达式
 */
export interface ForIteratorExpression extends FunctionExpression {
  returns: BlockCodegenNode
}

// AST Utilities ---------------------------------------------------------------
// ast 程序

// Some expressions, e.g. sequence and conditional expressions, are never
// associated with template nodes, so their source locations are just a stub.
// Container types like CompoundExpression also don't need a real location.
/**
 * 源位置
 */
export const locStub: SourceLocation = {
  source: '',
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 }
}

/**
 * 创建根节点
 * @param children
 * @param loc
 * @returns
 */
export function createRoot(
  children: TemplateChildNode[],
  loc = locStub
): RootNode {
  return {
    type: NodeTypes.ROOT,
    children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc
  }
}

/**
 * 创建vnode调用
 * @param context
 * @param tag
 * @param props
 * @param children
 * @param patchFlag
 * @param dynamicProps
 * @param directives
 * @param isBlock
 * @param disableTracking
 * @param isComponent
 * @param loc
 * @returns
 */
export function createVNodeCall(
  context: TransformContext | null,
  tag: VNodeCall['tag'],
  props?: VNodeCall['props'],
  children?: VNodeCall['children'],
  patchFlag?: VNodeCall['patchFlag'],
  dynamicProps?: VNodeCall['dynamicProps'],
  directives?: VNodeCall['directives'],
  isBlock: VNodeCall['isBlock'] = false,
  disableTracking: VNodeCall['disableTracking'] = false,
  isComponent: VNodeCall['isComponent'] = false,
  loc = locStub
): VNodeCall {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK)
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent))
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent))
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES)
    }
  }

  return {
    type: NodeTypes.VNODE_CALL,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent,
    loc
  }
}

/**
 * 创建数组表达式
 * @param elements
 * @param loc
 * @returns
 */
export function createArrayExpression(
  elements: ArrayExpression['elements'],
  loc: SourceLocation = locStub
): ArrayExpression {
  return {
    type: NodeTypes.JS_ARRAY_EXPRESSION,
    loc,
    elements
  }
}

/**
 * 创建对象表达式
 * @param properties
 * @param loc
 * @returns
 */
export function createObjectExpression(
  properties: ObjectExpression['properties'],
  loc: SourceLocation = locStub
): ObjectExpression {
  return {
    type: NodeTypes.JS_OBJECT_EXPRESSION,
    loc,
    properties
  }
}

/**
 * 创建对象属性
 * @param key
 * @param value
 * @returns
 */
export function createObjectProperty(
  key: Property['key'] | string,
  value: Property['value']
): Property {
  return {
    type: NodeTypes.JS_PROPERTY,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value
  }
}

/**
 * 创建简单表达式
 * @param content
 * @param isStatic
 * @param loc
 * @param constType
 * @returns
 */
export function createSimpleExpression(
  content: SimpleExpressionNode['content'],
  isStatic: SimpleExpressionNode['isStatic'] = false,
  loc: SourceLocation = locStub,
  constType: ConstantTypes = ConstantTypes.NOT_CONSTANT
): SimpleExpressionNode {
  return {
    type: NodeTypes.SIMPLE_EXPRESSION,
    loc,
    content,
    isStatic,
    constType: isStatic ? ConstantTypes.CAN_STRINGIFY : constType
  }
}

/**
 * 创建插值
 */
export function createInterpolation(
  content: InterpolationNode['content'] | string,
  loc: SourceLocation
): InterpolationNode {
  return {
    type: NodeTypes.INTERPOLATION,
    loc,
    content: isString(content)
      ? createSimpleExpression(content, false, loc)
      : content
  }
}

/**
 * 创建复杂表达式
 * @param children
 * @param loc
 * @returns
 */
export function createCompoundExpression(
  children: CompoundExpressionNode['children'],
  loc: SourceLocation = locStub
): CompoundExpressionNode {
  return {
    type: NodeTypes.COMPOUND_EXPRESSION,
    loc,
    children
  }
}

/**
 * 推断编码节点类型
 */
type InferCodegenNodeType<T> = T extends typeof RENDER_SLOT
  ? RenderSlotCall
  : CallExpression

/**
 * 创建调用表达式
 * @param callee
 * @param args
 * @param loc
 * @returns
 */
export function createCallExpression<T extends CallExpression['callee']>(
  callee: T,
  args: CallExpression['arguments'] = [],
  loc: SourceLocation = locStub
): InferCodegenNodeType<T> {
  return {
    type: NodeTypes.JS_CALL_EXPRESSION,
    loc,
    callee,
    arguments: args
  } as InferCodegenNodeType<T>
}

/**
 * 创建函数表达式
 * @param params
 * @param returns
 * @param newline
 * @param isSlot
 * @param loc
 * @returns
 */
export function createFunctionExpression(
  params: FunctionExpression['params'],
  returns: FunctionExpression['returns'] = undefined,
  newline: boolean = false,
  isSlot: boolean = false,
  loc: SourceLocation = locStub
): FunctionExpression {
  return {
    type: NodeTypes.JS_FUNCTION_EXPRESSION,
    params,
    returns,
    newline,
    isSlot,
    loc
  }
}

/**
 * 创建条件表达式
 * @param test
 * @param consequent
 * @param alternate
 * @param newline
 * @returns
 */
export function createConditionalExpression(
  test: ConditionalExpression['test'],
  consequent: ConditionalExpression['consequent'],
  alternate: ConditionalExpression['alternate'],
  newline = true
): ConditionalExpression {
  return {
    type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  }
}

/**
 * 创建缓存表达式
 * @param index
 * @param value
 * @param isVNode
 * @returns
 */
export function createCacheExpression(
  index: number,
  value: JSChildNode,
  isVNode: boolean = false
): CacheExpression {
  return {
    type: NodeTypes.JS_CACHE_EXPRESSION,
    index,
    value,
    isVNode,
    loc: locStub
  }
}

/**
 * 创建块代码
 * @param body
 * @returns
 */
export function createBlockStatement(
  body: BlockStatement['body']
): BlockStatement {
  return {
    type: NodeTypes.JS_BLOCK_STATEMENT,
    body,
    loc: locStub
  }
}

/**
 * 创建模板文本
 * @param elements
 * @returns
 */
export function createTemplateLiteral(
  elements: TemplateLiteral['elements']
): TemplateLiteral {
  return {
    type: NodeTypes.JS_TEMPLATE_LITERAL,
    elements,
    loc: locStub
  }
}

/**
 * 创建if代码
 * @param test
 * @param consequent
 * @param alternate
 * @returns
 */
export function createIfStatement(
  test: IfStatement['test'],
  consequent: IfStatement['consequent'],
  alternate?: IfStatement['alternate']
): IfStatement {
  return {
    type: NodeTypes.JS_IF_STATEMENT,
    test,
    consequent,
    alternate,
    loc: locStub
  }
}

/**
 * 创建参数表达式
 */
export function createAssignmentExpression(
  left: AssignmentExpression['left'],
  right: AssignmentExpression['right']
): AssignmentExpression {
  return {
    type: NodeTypes.JS_ASSIGNMENT_EXPRESSION,
    left,
    right,
    loc: locStub
  }
}

/**
 * 创建序列表达式
 * @param expressions
 * @returns
 */
export function createSequenceExpression(
  expressions: SequenceExpression['expressions']
): SequenceExpression {
  return {
    type: NodeTypes.JS_SEQUENCE_EXPRESSION,
    expressions,
    loc: locStub
  }
}

/**
 * 创建返回代码
 */
export function createReturnStatement(
  returns: ReturnStatement['returns']
): ReturnStatement {
  return {
    type: NodeTypes.JS_RETURN_STATEMENT,
    returns,
    loc: locStub
  }
}
