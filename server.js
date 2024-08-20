const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4006;
app.use(cors());
app.use(express.json());

require('./config/db').connect();

// route import and mount
const user = require("./routes/route");
app.use("/api/v3",user);

// activation

app.listen(PORT, ()=>{
    console.log(`APP is listening on Port ---> ${PORT}`);
})

