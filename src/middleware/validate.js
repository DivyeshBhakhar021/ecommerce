const { pick } = require("../helper/pick");

const validate= (schema) => (req,res,next) => {
   console.log(Object.keys(schema));
//    console.log(req.body);
   
const objs =  pick(req,Object.keys(schema))

console.log(objs);
   
}

module.exports = validate;