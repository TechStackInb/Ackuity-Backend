const he = require('he');

const escapeHtml = (data) => {
  const escapedData = {};
  for (const key in data) {
    if (typeof data[key] === 'string') {
      escapedData[key] = he.escape(data[key]);
    } else {
      escapedData[key] = data[key];
    }
  }
  return escapedData;
};

module.exports = escapeHtml;
