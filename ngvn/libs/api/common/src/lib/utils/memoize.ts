const defaultKey = 'default';

export function memoize(fn: Function) {
  const cache = {};
  return (...args) => {
    const n = args[0] || defaultKey;
    if (n in cache) {
      return cache[n];
    } else {
      const result = fn(n === defaultKey ? undefined : n);
      cache[n] = result;
      return result;
    }
  };
}
