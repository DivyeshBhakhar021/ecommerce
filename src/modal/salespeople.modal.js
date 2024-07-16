const  pool  = require("../db/Sql");

const getsalespeople = async (req, res) => {
    try {
        const data = await pool.execute("SELECT * FROM salespeople")
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getsalespeople
};