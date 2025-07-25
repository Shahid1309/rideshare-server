const mongoose = require("mongoose");


// const postRideSchema = new mongoose.Schema({
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
//   availableSeat: { type: Number, required: true },
//   costPerSeat: { type: Number, required: true },
//   name: { type: String, required: true },
// });


const postRideSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  availableSeat: { type: Number, required: true },
  costPerSeat: { type: Number, required: true },
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('PostRide', postRideSchema);



