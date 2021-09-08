const range: number = 2
/**
 * 生成代码帧
 * @param source 源码 
 * @param start 开始位置
 * @param end 结束文字
 * @returns 代码帧
 */
export function generateCodeFrame(
  source: string,
  start = 0,
  end = source.length
): string {
  // Split the content into individual lines but capture the newline sequence
  // that separated each line. This is important because the actual sequence is
  // needed to properly take into account the full line length for offset
  // comparison
  // 将内容拆分为单独的行，但捕获换行符序列
  // 分隔了每一行。这很重要，因为实际的顺序是
  // 需要适当考虑偏移的全行长度比较
  let lines = source.split(/(\r?\n)/)

  // Separate the lines and newline sequences into separate arrays for easier referencing
  // 将行和换行符序列分隔为单独的数组，以便于引用
  // 新行  奇数行
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1)
  // 行  偶数行
  lines = lines.filter((_, idx) => idx % 2 === 0)
  // 字符个数
  let count = 0
  // 结果
  const res: string[] = []
  for (let i = 0; i < lines.length; i++) {
    count +=
      lines[i].length +
      ((newlineSequences[i] && newlineSequences[i].length) || 0)
    // 字符总数 大于起始位置  开始处理 
    if (count >= start) {
      // 
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue
        // 行号
        const line = j + 1
        // 处理行信息
        res.push(
          `${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${
            lines[j]
          }`
        )
        // 行长度
        const lineLength = lines[j].length
        // 
        const newLineSeqLength =
          (newlineSequences[j] && newlineSequences[j].length) || 0

        if (j === i) {
          // push underline
          // 下划线
          // 计算当前行得开始位置
          const pad = start - (count - (lineLength + newLineSeqLength))
          // 计算长度
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          )
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length))
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1)
            res.push(`   |  ` + '^'.repeat(length))
          }

          count += lineLength + newLineSeqLength
        }
      }
      break
    }
  }
  return res.join('\n')
}
