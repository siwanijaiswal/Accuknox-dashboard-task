export const groupBy = (data, key) => {
  return data.reduce((result, object) => {
    if (!result[object[key]]) {
      result[object[key]] = [];
    }
    result[object[key]].push(object);
    return result;
  }, {});
};
