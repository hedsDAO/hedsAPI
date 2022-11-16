const formatDollars = (num: number) => {
  const dollars = num.toString().split('.')[0];
  const cents = num.toString().split('.')[1];
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const formattedDollars = numberWithCommas(+dollars);
  return '$' + formattedDollars + '.' + cents;
};
export default formatDollars;
