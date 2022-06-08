const Health = require("../models/health");
exports.addHealth = async (req, res) => {
  try {
    const newHealth = new Health({
      temperature: req.body.temperature,
      pulse: req.body.pulse,
      oxygen: req.body.oxygen,
    });
    const health = await newHealth.save();
    res.status(200).json({ sucess: true, data: health });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};

exports.displayHealth = async (req, res) => {
  try {
    const healthDetails = await Health.find();
    console.log("Details", healthDetails);
    res.status(200).json({
      sucess: true,
      data: healthDetails,
    });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};
