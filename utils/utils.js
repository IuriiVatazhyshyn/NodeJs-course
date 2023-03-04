const filterLogs = (logs, from, to, limit) => {
  if (logs.length === 0) return [];

  const sortedLogs = logs.sort((prev, next) => prev.date < next.date ? -1 : 1);
  let results = sortedLogs;

  const fromDate = validateDate(from);
  const toDate = validateDate(to);

  if (fromDate && toDate) {
    results = sortedLogs.filter(({ date }) =>
      new Date(date) >= new Date(fromDate) && new Date(date) <= new Date(toDate)
    );
  } else if (toDate) {
    results = sortedLogs.filter(({ date }) =>
      new Date(date) <= new Date(toDate)
    );
  } else if (fromDate) {
    results = sortedLogs.filter(({ date }) =>
      new Date(date) >= new Date(fromDate)
    );
  }
  if (limit) {
    return results.slice(0, limit);
  }

  return results;
};

const validateDate = (date) => {
  const regex = new RegExp('\\d{4}-\\d{2}-\\d{2}');
  const matched = regex.test(date);

  if (!matched) return false;

  return date;
};

const sendErrorResponse = (response, statusCode, message) => response.status(statusCode).json({ message });

module.exports = { filterLogs, validateDate, sendErrorResponse };