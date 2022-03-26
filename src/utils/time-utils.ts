const treatAsUTC = (date: Date) => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};

const millisecondsPerDay = 24 * 60 * 60 * 1000;

export const daysBetween = (startDate: Date, endDate: Date) => {
  const start = treatAsUTC(startDate).getTime();
  const end = treatAsUTC(endDate).getTime();

  return Math.floor((end - start) / millisecondsPerDay);
};
