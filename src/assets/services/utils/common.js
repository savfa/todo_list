/**
 * Объединяет несколько объектов в один новый
 * @param {...Object} rest - объекты
 * @returns {Object}
 */
export const extendObject = (...rest) => {
  return Object.assign({}, ...rest);
};

export const ReplaceParameterInUrl = {
  id: (url, value) => {
    return url.replace(`:id`, value);
  },
  pagination: (url, page, perPage = 50) => {
    return url.replace(`:pagination`, `?page=${page}&perPage=${perPage}`);
  },
};

/**
 * Возвращает элементы из targetArray, которых нет в comparableArray.
 * Работает только с массивами объектов.
 * @param {Array} targetArray - Массив ИЗ которого берём значения
 * @param {Array} comparableArray - Массив В котором проверяем уникальность
 * @param {string} field - Имя реквизита по которому сравнивать
 * @returns {Array} - Результирующий массив
 */
export const getUniqueArrayObjects = (targetArray, comparableArray, field) => {
  return targetArray.filter(
    (target) =>
      !comparableArray.some((additional) => additional[field] === target[field])
  );
};

/**
 * Возвращает элементы из targetArray, которых нет в comparableArray.
 * Работает только с массивами объектов.
 * @param {Array} targetArray - Массив ИЗ которого берём значения
 * @param {Array} comparableArray - Массив В котором проверяем уникальность
 * @param {Array} fields - Массив имен реквизитов по которомым сравнивать
 * @returns {Array} - Результирующий массив
 */
export const getUniqueArrayObjectsMoreFields = (
  targetArray,
  comparableArray,
  fields
) => {
  return targetArray.filter(
    (target) =>
      !comparableArray.some((additional) =>
        fields.every((field) => additional[field] === target[field])
      )
  );
};
