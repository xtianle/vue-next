export const enum SlotFlags {
  /**
   * Stable slots that only reference slot props or context state. The slot
   * can fully capture its own dependencies so when passed down the parent won't
   * need to force the child to update.
   * 只引用插槽支撑或上下文状态的稳定插槽。槽
   * 可以完全捕获自己的依赖项，因此当传递给父级时不会
   * 需要强制孩子更新。
   */
  STABLE = 1,
  /**
   * Slots that reference scope variables (v-for or an outer slot prop), or
   * has conditional structure (v-if, v-for). The parent will need to force
   * the child to update because the slot does not fully capture its dependencies.
   * 引用作用域变量的插槽（v-for或外部插槽属性），或
   * 具有条件结构（v-if，v-for）。家长需要强制
   * 因为插槽没有完全捕获其依赖项，所以无法更新子项。
   */
  DYNAMIC = 2,
  /**
   * `<slot/>` being forwarded into a child component. Whether the parent needs
   * to update the child is dependent on what kind of slots the parent itself
   * received. This has to be refined at runtime, when the child's vnode
   * is being created (in `normalizeChildren`)
   * 
   * `<slot/>`被转发到子组件中。父母是否需要
   * 更新子对象取决于父对象本身的插槽类型
   * 收到。当子节点的vnode
   * 正在创建（在“normalizeChildren”中）
   */
  FORWARDED = 3
}

/**
 * Dev only
 */
export const slotFlagsText = {
  [SlotFlags.STABLE]: 'STABLE',
  [SlotFlags.DYNAMIC]: 'DYNAMIC',
  [SlotFlags.FORWARDED]: 'FORWARDED'
}
