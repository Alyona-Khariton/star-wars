import dayjs from 'dayjs';

/**
 * Форматирует дату и время
 *
 * @param {number|string} value Валидный объект для dayjs
 * @param {boolean} utc Часовой пояс utc (по умолчанию false)
 * @param {string} format Формат даты/времени (по умолчанию 'L')
 * @return {string} Локализованная отформатированная строка
 */
export function formatDateTime({ value, utc = false, format = 'L' }) {
  let date = dayjs(value, ['YYYY-MM-DDTHH:mm:ssZ', 'HH:mm:ss']);

  if (!date.isValid()) return null;

  if (utc) date = dayjs.utc(date);

  return date.format(format);
}

/**
 *
 * @param {string} url Значение url'а с идентификатором в последней секции
 * @returns {string} Идентификатор
 */
export function getIdFromUrl(url) {
  if (!url) return;

  const lastIndex = url?.lastIndexOf('/');
  const id = url?.slice(lastIndex + 1);

  return id;
}
