const  pool  = require("../db/Sql");

const getsalespeople = async (req, res) => {
    try {
        const [result,field] = await pool.execute("SELECT * FROM salespeople");

        // console.log("data",result);
        return result
    } catch (error) {
        // console.log("modal",error);
      throw new Error("fill to facth salespeople data") 
    }
}

const addsalespeople = async (sname,city,comm) => {
    try {
        const [data] = await pool.execute("INSERT INTO salespeople(sname,city,comm) VALUES(?,?,?)",[sname,city,comm]);

        return {snum:data.insertId,sname,city,comm};
        return data;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getsalespeople,
    addsalespeople
};