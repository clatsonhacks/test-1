const express = require("express");
const app = express();
let dataStore = [];
app.use(express.json());
// POST endpoint to save data
app.post('/api/save', (req, res) => {
  const { address } = req.body;
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'A valid address is required.' });
  }

  const newData = { id: dataStore.length + 1, address };
  dataStore.push(newData);

  res.status(201).json({ message: 'Data saved successfully.', data: newData });
});

app.get("/api/data", (req, res) => {res.json(dataStore)});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
