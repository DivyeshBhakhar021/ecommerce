const { getsalespeople } = require("../modal/salespeople.modal");

const listsalespeople = async (req, res) => {
    try {
      const salespeople = await getsalespeople();
  
      console.log(salespeople);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error " + error.message
      });
    }
  }


module.exports = { listsalespeople };


