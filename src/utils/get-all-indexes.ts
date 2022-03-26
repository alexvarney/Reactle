export const getAllIndexes = <T>(
  arr: T[],
  matcher: (value: T, index: number) => boolean
): number[] => {
  const indexes: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (matcher(arr[i], i) === true) {
      indexes.push(i);
    }
  }

  return indexes;
};
