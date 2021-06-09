export const randomId = (prefix) => {
  let result = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 32; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}_${result}`;
};
