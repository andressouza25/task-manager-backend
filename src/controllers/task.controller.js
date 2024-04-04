const TaskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.errors");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    // Rota: Buscar as TASKS do DB
    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    // Rota: Buscar TASK específica
    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            if (!task) {
                return notFoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    // Rota: Criar TASK nova
    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    // Rota: Atualizar TASK
    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            // Localizamos a TASK
            const taskToUpdate = await TaskModel.findById(taskId);

            // Se não localizar, vai retornar um erro
            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            // Mapeou os campo que são editaveis
            const allowedUpdates = ["isCompleted"];
            // Campos que o USUÁRIO está tentando atualizar
            const requestedUpdates = Object.keys(taskData);
            // Para cada campo que recebemos no body, verificamos se a lista de campos editaveis está inclusa.
            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    // Se estiver, ela será editavel
                    // Basicamente, estamos dizendo no código abaixo:
                    // taskToUpdate[isCompleted] = this.req.body[isCompleted(novo)];
                    taskToUpdate[update] = taskData[update];
                } else {
                    // Se não for editvel, retornará a msg abaixo
                    return this.res
                        .status(500)
                        .send("Um ou mais campos inseridos não são editáveis!");
                }
            }
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    // Rota: Deletar TASK
    async deleteTask() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }
            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
