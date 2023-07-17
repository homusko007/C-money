import {getYear, getMonth} from './formatDate';

export const filtrChartData = (year, data) => {
  if (!data) return;

  const arrYear = data.filter(item => {
    const accYear = getYear(item.date);
    if (accYear + '' === year) return item;
  });

  const arrSum = new Array(12).fill(0);

  arrYear.forEach((item) => {
    const elMonth = getMonth(item.date);
    for (let i = 0; i < arrSum.length; i++) {
      if (+elMonth === i && arrSum[i] < item.balance) {
        arrSum[i] = item.balance;
      }
    }
  });

  for (let i = 0; i < arrSum.length; i++) {
    if (arrSum[i] === 0 && arrSum[i - 1]) {
      arrSum[i] = arrSum[i - 1];
    }
  }

  /* const groupByMonth = [...data].reduce((acc, obj) => {
    (acc[obj.month] = acc[obj.month] || []).push(obj.balance);
    return acc;
  }, {});


  console.log(groupByMonth);
  const arr = [];
  for (const key in groupByMonth) {
    if (groupByMonth) {
      arr.push({month: key,
        maxSum: Math.max.apply(null, groupByMonth[key])});
    }
  }
  const arrSum = new Array(11).fill(0);
  arr.forEach((el) => {
    for (let i = 0; i <= 12; i++) {
      if (+el.month === i) {
        arrSum[i] = el.maxSum;
      }
    }
  });*/

  const labels = ['Янв', 'Фeв', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг',
    'Сент', 'Окт', 'Ноя', 'Дек'];

  const chartData = {
    arrSum,
    labels,
    datasets: [
      {
        datasets: '1 Dataset',
        data: arrSum,
        borderWidth: 4,
        borderColor: '#9c19ca',
        backgroundColor: '#9c19ca',
      },
    ],
  };

  return chartData;
};
