const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
  });

  return formatter.format(num);
};

export default formatNumber;
