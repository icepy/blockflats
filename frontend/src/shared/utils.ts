

export function parseSearch<T>(search: string): T{
  const obj = Object.create(null);
  if (!search) return obj;
  search = search.substr(1);
  const searchs = search.split('&');
  for (const iterator of searchs) {
    const urlParams = iterator.split('=');
    obj[urlParams[0]] = urlParams[1];
  }
  return obj;
}
