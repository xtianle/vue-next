// using literal strings instead of numbers so that it's easier to inspect
// debugger events
// 使用文字字符串而不是数字，以便更容易检查
// 调试器事件

// 跟踪类型
export const enum TrackOpTypes {
  GET = 'get',        // 获取
  HAS = 'has',        // 检查是否存在
  ITERATE = 'iterate' // 迭代
}
// 触发器类型
export const enum TriggerOpTypes {
  SET = 'set',        // 设置
  ADD = 'add',        // 添加
  DELETE = 'delete',  // 删除
  CLEAR = 'clear'     // 清除
}
