// IMPORT DE BIBLIOTECA
const express = require("express");
const dotenv = require("dotenv");

// IMPORT DE ARQUIVO
const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Hello wolrd!");
});

app.listen(8000, () => console.log("Listening on port 8000!"));
