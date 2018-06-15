export const getTimeLeft = timeToDest => {
  if (!timeToDest) {
    return -1;
  }
  // timeToDest in milliseconds
  const t = Math.ceil((timeToDest - new Date().getTime()) / 1000);
  return t > 0 ? t : 0;
};
