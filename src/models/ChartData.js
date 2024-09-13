const mongoose = require('mongoose');

const ChartDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: [
        'Total Served',
        'Total Denied',
        'Total Transformed',
        'Total Threats',
      ],
      required: true,
    },
    data: {
      labels: {
        type: [String],
        enum: ['RAG', 'Function Calling', 'Agents', 'Chat2Database'],
        required: true,
      },
      values: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chart = mongoose.model('Chart', ChartDataSchema);

module.exports = Chart;
