export default n => fn =>
  Array(n).fill(undefined).map((_, i) => fn(i));
