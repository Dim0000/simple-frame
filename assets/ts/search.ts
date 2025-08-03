interface SearchDataItem {
  url: string;
  title: string;
  body: string;
}

declare const data: SearchDataItem[];

const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword") || "";

const input = document.getElementById("searchInput") as HTMLInputElement | null;

if (input) {
  input.value = keyword;
}

if (keyword.trim()) {
  search(keyword);
}

function search(query: string): void {
  const result = searchData(query);
  const html = createHtml(result);
  showResult(html);
  showResultCount(result.length, data.length);
}

type SearchResult = [number, number, number];

function searchData(query: string): SearchResult[] {
  const result: SearchResult[] = [];

  query = query.trim();
  if (query.length < 1) {
    return result;
  }

  const re = new RegExp(query, 'i');
  for (let i = 0; i < data.length; ++i) {
    const pos = data[i].body.search(re);
    if (pos !== -1) {
      result.push([i, pos, pos + query.length]);
    }
  }

  return result;
}

function createHtml(result: SearchResult[]): string {
  const htmls: string[] = [];
  for (const [dataIndex, startPos, endPos] of result) {
    const { url, title, body } = data[dataIndex];
    htmls.push(createEntry(url, title, body, startPos, endPos));
  }
  return htmls.join('');
}

function createEntry(url: string, title: string, body: string, startPos: number, endPos: number): string {
  const template = document.getElementById("searchItemTemplate") as HTMLTemplateElement;
  if (!template) {
    throw new Error('Template element with id "searchItemTemplate" not found.');
  }

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const link = clone.querySelector(".search__item--title") as HTMLAnchorElement | null;
  if (link) {
    link.href = url;
    link.textContent = title;
  }

  const excerptEl = clone.querySelector(".search__item--excerpt") as HTMLElement | null;
  if (excerptEl) {
    excerptEl.innerHTML = excerpt(body, startPos, endPos);
  }

  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  return wrapper.innerHTML;
}

function excerpt(body: string, startPos: number, endPos: number): string {
  const start = Math.max(startPos - 30, 0);
  return [
    body.substring(start, startPos),
    '<b>', body.substring(startPos, endPos), '</b>',
    body.substring(endPos, endPos + 200)
  ].join('');
}

function showResult(html: string): void {
  const el = document.getElementById('searchResult');
  if (el) {
    el.innerHTML = html;
  }
}

function showResultCount(count: number, total: number): void {
  const el = document.getElementById('searchResultCount');
  if (el) {
    el.innerHTML = `<b>${count}</b> result(s) found (out of ${total})`;
  }
}