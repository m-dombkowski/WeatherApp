export const unixToNormalTime = function (unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  const formattedTime = hours + " : 00";
  return formattedTime;
};

export const unixToDate = function (unixTimestamp) {
  const miliseconds = unixTimestamp * 1000;
  const dateObject = new Date(miliseconds);

  const humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};
