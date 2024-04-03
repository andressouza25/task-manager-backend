const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URL}`
        );
        console.log("Mongo connected!");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectToDatabase;
