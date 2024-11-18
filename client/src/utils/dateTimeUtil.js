const timeZone = "Asia/Manila";

export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
  });
  const formattedDate = formatter.format(new Date(date));

  const [datePart, timePart] = formattedDate.split(", ");
  return { date: datePart, time: timePart };
};

// export const formatDateForInput = (date) => {
//   const formatterDate = new Intl.DateTimeFormat("en-PH", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     timeZone,
//   });

//   const formatterTime = new Intl.DateTimeFormat("en-PH", {
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone,
//     hour12: false,
//   });

//   const parsedDate = new Date(date);

//   const [month, day, year] = formatterDate
//     .format(parsedDate)
//     .split("/")
//     .map((val) => val.padStart(2, "0"));
//   const [hour, minute] = formatterTime
//     .format(parsedDate)
//     .split(":")
//     .map((val) => val.padStart(2, "0"));

//   return `${year}-${month}-${day}T${hour}:${minute}`;
// };

export const formatDateForInput = (date) => {
  const parsedDate = new Date(date);

  return parsedDate.toISOString();
};

export const formatTimeForInput = (date) => {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
  return formatter.format(new Date(date));
};

export const formatDateForDisplay = (date) => {
  const parsedDate = new Date(date);

  const options = {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return parsedDate.toLocaleString("en-PH", options);
};