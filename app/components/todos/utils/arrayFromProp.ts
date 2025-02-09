export function arrayFromProp<T>(arr: T[], prop: keyof T): boolean[] {
  return Array.from(arr, (x) => {
    const value = x[prop];
    if (typeof value === 'boolean') {
      return value;
    }
    throw new Error(
      `Property ${String(prop)} is not of type string or boolean`
    );
  });
}
