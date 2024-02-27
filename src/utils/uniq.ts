export function uniq<T>(arr: T[], getKey: (item: T) => any): T[] {
  const uniq = new Set();
  const uniqResult = arr.filter((item) => {
    const key = getKey(item);
    if (key !== null && !uniq.has(key)) {
      uniq.add(key);
      return true;
    }
    return false;
  });
  return uniqResult;
}
