export function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let minutesString = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutesString + " " + ampm;
  return strTime;
}
