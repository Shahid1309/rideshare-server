// const express = require("express");
// const router = express.Router();
// const PostRide = require("../models/PostRide");
// const authMiddleware = require("../middleware/auth")



// router.post("/postRide", authMiddleware, async (req, res) => {
//   try {
//     const { from, to, date, time, availableSeat, costPerSeat, name } = req.body;

//     const newRide = new PostRide({
//       from,
//       to,
//       date,
//       time,
//       availableSeat,
//       costPerSeat,
//       name,
//       userId: req.user.id  // 
//     });

//     await newRide.save();
//     res.status(201).json({ message: "Ride posted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// router.get('/getRides', authMiddleware, async (req, res) => {
//   try {
//     const rides = await PostRide.find({ userId: req.user._id });
//     res.status(200).json(rides);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching rides', error });
//   }
// });

// router.get("/getAllRides", async (req, res) => {
//   try {
//     const rides = await PostRide.find().populate('userId', 'name phoneNumber');
//     res.json(rides);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// module.exports = router;

const express = require("express");
const PostRide = require("../models/PostRide");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST RIDE
router.post("/postRide", authMiddleware, async (req, res) => {
  try {
    const { from, to, date, time, availableSeat, costPerSeat, name } = req.body;

    if (!from || !to || !date || !time || !availableSeat || !costPerSeat || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRide = await PostRide.create({
      from,
      to,
      date,
      time,
      availableSeat,
      costPerSeat,
      name,
      userId: req.user._id
    });

    res.status(201).json({ message: "Ride posted successfully", ride: newRide });
  } catch (err) {
    console.error("Post ride error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RIDES BY LOGGED-IN USER
router.get("/getRides", authMiddleware, async (req, res) => {
  try {
    const rides = await PostRide.find({ userId: req.user._id });
    res.status(200).json(rides);
  } catch (err) {
    console.error("Get rides error:", err);
    res.status(500).json({ message: "Error fetching rides", error: err });
  }
});

// GET ALL RIDES (public)
router.get("/getAllRides", async (req, res) => {
  try {
    const rides = await PostRide.find().populate('userId', 'name phoneNumber city');
    res.status(200).json(rides);
  } catch (err) {
    console.error("Get all rides error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
