// IMPORT DE BIBLIOTECA
const express = require("express");
const dotenv = require("dotenv");

// IMPORT DE ARQUIVO
const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

// Rota: Buscar as TASKS do DB
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota: Buscar TASK específica
app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).send("Tarefa não encontrada!");
        }
        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota: Criar TASK nova
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota: Atualizar TASK

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToUpdate = await TaskModel.findById(taskId); // Localizamos a TASK

        const allowedUpdates = ["isCompleted"]; // Mapeou os campo que são editaveis
        const requestedUpdates = Object.keys(req.body); // Campos que o USUÁRIO está tentando atualizar

        // Para cada campo que recebemos no body, verificamos se a lista de campos editaveis está inclusa.
        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                // Se estiver, ela será editavel
                // Basicamente, estamos dizendo no código abaixo:
                // taskToUpdate[isCompleted] = req.body[isCompleted(novo)];
                taskToUpdate[update] = req.body[update];
            } else {
                // Se não for editvel, retornará a msg abaixo
                return res
                    .status(500)
                    .send("Um ou mais campos inseridos não são editáveis!");
            }
        }
        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota: Deletar TASK
app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            res.status(404).send("Tarefa não encontrada");
        }
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log("Listening on port 8000!"));
