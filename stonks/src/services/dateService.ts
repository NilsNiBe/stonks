export function dateAddDays(date: Date, numberOfDays: number) {
  const res = new Date(date);
  res.setDate(res.getDate() + numberOfDays);
  return res;
}
