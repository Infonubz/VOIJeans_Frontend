export const Formatamount = (amt) => {
  const formattedAmount = new Intl.NumberFormat("en-IN").format(amt);
  return formattedAmount;
};
