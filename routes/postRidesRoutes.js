const express = require("express");
const router = express.Router();
const PostRide = require("../models/PostRide");
const authMiddleware = require("../middleware/auth")

// router.post("/postRide", async (req, res) => {
//   try {
//     const { from, to, date, time, availableSeat, costPerSeat,name } = req.body;

//     const newRide = new PostRide({
//       from,
//       to,
//       date,
//       time, 
//       availableSeat,
//       costPerSeat,
//       name
//     });

//     await newRide.save();
//     res.status(201).json({ message: "Ride posted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/postRide", authMiddleware, async (req, res) => {
  try {
    const { from, to, date, time, availableSeat, costPerSeat, name } = req.body;

    const newRide = new PostRide({
      from,
      to,
      date,
      time,
      availableSeat,
      costPerSeat,
      name,
      userId: req.user.id  // 👈 from the decoded JWT
    });

    await newRide.save();
    res.status(201).json({ message: "Ride posted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get('/getRides', async (req, res) => {
//   try {
//     const { to, date, minSeats } = req.query;

//     const filter = {};
//     if (to) filter.to = to;
//     if (date) filter.date = date;
//     if (minSeats) filter.availableSeat = { $gte: parseInt(minSeats) };

//     const rides = await PostRide.find(filter);
//     res.status(200).json(rides);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching rides', error });
//   }
// });


router.get('/getRides', authMiddleware, async (req, res) => {
  try {
    const rides = await PostRide.find({ userId: req.user._id });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rides', error });
  }
});

router.get("/getAllRides", async (req, res) => {
  try {
    const rides = await PostRide.find().populate('userId', 'name phoneNumber');
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
