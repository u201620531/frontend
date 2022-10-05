export const formatoFechaGuion = (date: Date): string => {
  const year = '' + date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
};

export const formatoFechaGuionCadena = (date: string): string => {
  const day = date.substring(0, 2);
  const month = date.substring(3, 5);
  const year = date.substring(6, 10);
  return year + '-' + month + '-' + day;
};
