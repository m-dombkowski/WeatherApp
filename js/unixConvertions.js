export const unixToNormalTime = function (unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();

  let formattedTime = hours + " : 00";
  return formattedTime;
};

export const unixToDate = function (unixTimestamp) {
  let miliseconds = unixTimestamp * 1000;
  let dateObject = new Date(miliseconds);

  let humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};
