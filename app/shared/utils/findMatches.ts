export function findMatches<T>(
  list: T[],
  prop: keyof T,
  search: string
): T[] | [] {
  if (!Array.isArray(list)) {
    throw new Error('Expected list to be an array');
  }

  if (typeof prop !== 'string') {
    throw new Error('Expected prop to be a string');
  }

  if (typeof search !== 'string') {
    throw new Error('Expected search to be a string');
  }

  if (list.length === 0) {
    return [];
  }

  if (search.length === 0) {
    return list;
  }

  return list.filter((item: T) => {
    return String(item[prop]).toLowerCase().includes(search.toLowerCase());
  });
}
