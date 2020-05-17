const toArray = (prev = [], el) => prev.concat(el);

export const groupBy = (array, getKey, merge = toArray) => {
  const groups = {};
  for (const el of array) {
    const key = JSON.stringify(getKey(el));
    groups[key] = merge(groups[key], el);
  }
  return Object.values(groups);
};
