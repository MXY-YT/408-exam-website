/**
 * 多列表格在窄屏下的最小内容宽度会超过容器，而 overflow 对 table 元素
 * 本身无效。这里给每个表格包一层横向滚动容器，避免内容被裁剪。
 */
export function wrapTablesInScrollContainer(html: string): string {
  if (!html.includes("<table")) return html;

  const doc = new DOMParser().parseFromString(
    `<div data-kb-root>${html}</div>`,
    "text/html",
  );
  const root = doc.querySelector("[data-kb-root]");
  if (!root) return html;

  root.querySelectorAll("table").forEach((table) => {
    const wrapper = doc.createElement("div");
    wrapper.className = "kb-table-scroll";
    table.replaceWith(wrapper);
    wrapper.appendChild(table);
  });

  return root.innerHTML;
}
