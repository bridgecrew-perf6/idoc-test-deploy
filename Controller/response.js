const Response = require("../models/response");

exports.addResponse = async (req, res) => {
  try {
    const newResponse = new Response({
      question_one: req.body.question_one,
      question_two: req.body.question_two,
      question_three: req.body.question_three,
      question_four: req.body.question_four,
      question_five: req.body.question_five,
    });
    console.log(newResponse);
    const response = await newResponse.save();
    res.status(200).json({ sucess: true });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};
