import { describe, expect, it } from 'vitest'
import { wrapTablesInScrollContainer } from '@/components/markdown/tableScroll'

describe('wrapTablesInScrollContainer', () => {
  it('给表格包一层横向滚动容器', () => {
    const html = '<p>说明</p><table><tbody><tr><td>1</td></tr></tbody></table>'
    const result = wrapTablesInScrollContainer(html)

    const doc = new DOMParser().parseFromString(result, 'text/html')
    const scroller = doc.querySelector('.kb-table-scroll')
    expect(scroller).not.toBeNull()
    expect(scroller?.querySelector('table')).not.toBeNull()
    // 表格不能脱离原有位置
    expect(doc.querySelectorAll('.kb-table-scroll').length).toBe(1)
  })

  it('多个表格各自独立包裹', () => {
    const html =
      '<table><tbody><tr><td>a</td></tr></tbody></table><p>x</p><table><tbody><tr><td>b</td></tr></tbody></table>'
    const doc = new DOMParser().parseFromString(
      wrapTablesInScrollContainer(html),
      'text/html',
    )

    const wrappers = doc.querySelectorAll('.kb-table-scroll')
    expect(wrappers.length).toBe(2)
    wrappers.forEach((w) => expect(w.querySelector('table')).not.toBeNull())
  })

  it('无表格时原样返回，不改变结构', () => {
    const html = '<p>纯文字段落</p>'
    expect(wrapTablesInScrollContainer(html)).toBe(html)
  })
})
