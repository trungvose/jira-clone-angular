export function excludeKeys(
  obj: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> {
  return Object.keys(obj).reduce(
    (acc, key) => (keys.includes(key) ? acc : { ...acc, [key]: obj[key] }),
    {}
  );
}
