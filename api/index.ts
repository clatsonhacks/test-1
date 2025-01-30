const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
