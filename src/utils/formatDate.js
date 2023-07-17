const formatDate = date => {
  const d = Date.parse(date); // преобразуем строку в таймстамп
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('ru', options).format(new Date(d));
};

/* export const getMonth = (dateStr) => {
  const month = ['Янв', 'Фeв', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг',
    'Сент', 'Окт', 'Ноя', 'Дек'];
  const date = new Date(dateStr);
  return month[date.getMonth()];
};*/

export const getMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.getMonth();
};

export const getYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.getFullYear();
};

export default formatDate;

