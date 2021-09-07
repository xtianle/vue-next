/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * 制作一个地图并返回一个函数来检查
 * 在地图上。
 * IMPORTANT: all calls of this function must be prefixed with
 *  重要提示：此函数的所有调用都必须以
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 * 
 * 制作一个地图并返回一个函数来检查
 * 在地图上。
 * 重要提示：此函数的所有调用都必须以
 * \/\*\ \纯\_\_\*\/
 * 所以，如果需要的话，卷轴可以摇动它们。
 */

/**
 *
 * @param str 字符串
 * @param expectsLowerCase 是否要求小写
 * @returns
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}
