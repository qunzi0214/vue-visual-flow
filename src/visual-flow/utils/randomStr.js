export default function randomString(n) {
  const strMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  for (let i = 0; i < n; i += 1) {
    res += strMap[Math.floor(Math.random() * strMap.length)];
  }

  return res;
}
