export function dateAddDays(date: Date, numberOfDays: number) {
  date.setDate(date.getDate() + numberOfDays);
  return date;
}
