const express = require("express");
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use("/api/v1", routes);

connectDB();


app.listen(5000, () => {
    console.log("server is running on port 5000");
})
