'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TestSchema = new Schema({
    testId: { type: String },
  });

  return mongoose.model('Test', TestSchema);
};
