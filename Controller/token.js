const generateUniqueId = require("generate-unique-id");
exports.generateToken = async (req, res) => {
  try {
    // const id = "";
    // length = 5;
    // const characters = "A1234567890";
    // const charLength = characters.length;
    // for (var i = 0; i < length; i++) {
    //   id += characters.charAt(Math.floor(Math.random() * charLength));
    // }
    const length = 100000;
    const id = Math.floor(Math.random() * length);
    console.log(id);
    res.status(200).json({ sucess: true, token_no: id });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};
