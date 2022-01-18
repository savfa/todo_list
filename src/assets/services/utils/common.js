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

/**
 * Возвращает правильное склонение слова от входного числа
 * @param {number} count - число, от которого берем склонение
 * @param {array} declensions - массив склонений слов, порядок от 1, пример (['минута', 'минуты', 'минут'])
 * @returns {string} - возвращаюет правильное склонение из массива declensions
 */
export const declensionWordFromCount = (count, declensions) => {
  const abs = Math.abs(count) % 100;
  const abs1 = abs % 10;
  if (abs > 10 && abs < 20) {
    return declensions[2];
  }
  if (abs1 > 1 && abs1 < 5) {
    return declensions[1];
  }
  if (abs1 === 1) {
    return declensions[0];
  }
  return declensions[2];
};
