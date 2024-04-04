const express = require("express");
const TaskModel = require("../models/task.model");
const TaskController = require("../controllers/task.controller");
const router = express.Router();

// Rota: Buscar as TASKS do DB
router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

// Rota: Buscar TASK específica
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

// Rota: Criar TASK nova
router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

// Rota: Atualizar TASK
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

// Rota: Deletar TASK
router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

module.exports = router;
