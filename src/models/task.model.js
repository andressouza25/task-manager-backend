const { Schema, model } = require("mongoose");

// Schema é o esqueleto do nosso model.
// Ele vai dizer quais os campos que nosso model vai ter
const TaskSchema = Schema({
    description: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
