export function filterFind(
  arr1: string[],
  arr2: string[],
  arr3: string[],
): string[] {
  if (arr1.length === 0 && arr2.length === 0 && arr3.length === 0) {
    return [];
  }

  // Если два из трех массивов пустые, вернуть не пустой
  if (
    (arr1.length === 0 && arr2.length === 0) ||
    (arr1.length === 0 && arr3.length === 0) ||
    (arr2.length === 0 && arr3.length === 0)
  ) {
    return arr1.length !== 0 ? arr1 : arr2.length !== 0 ? arr2 : arr3;
  }

  // Если один из трех массивов пустой, вернуть пересечение непустого с другим непустым
  if (arr1.length === 0) {
    return arr2.filter((value) => arr3.includes(value));
  } else if (arr2.length === 0) {
    return arr1.filter((value) => arr3.includes(value));
  } else if (arr3.length === 0) {
    return arr1.filter((value) => arr2.includes(value));
  }

  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const set3 = new Set(arr3);

  const match: string[] = [];

  for (const string of set1) {
    if (set2.has(string) && set3.has(string)) {
      match.push(string);
    }
  }
  return match;
}
