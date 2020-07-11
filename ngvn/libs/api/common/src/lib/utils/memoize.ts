const defaultKey = 'default';

export function memoize(fn: Function) {
  const cache = {};
  return (...args) => {
    const n = args.reduce((key, arg) => key.concat('|', arg)) || defaultKey;
    if (n in cache) {
      return cache[n];
    } else {
      const result = n === defaultKey ? fn() : fn(...args);
      cache[n] = result;
      return result;
    }
  };
}
