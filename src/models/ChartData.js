const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    labels: {
      type: [String],
      required: true,
    },
    values: {
      type: [Number],
      required: true,
    },
  },
});

const Chart = mongoose.model('Chart', ChartDataSchema);

module.exports = Chart;
