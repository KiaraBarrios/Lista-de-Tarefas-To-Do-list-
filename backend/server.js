const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para ler o corpo das requisições

let tarefas = []; // Aqui vamos armazenar as tarefas em memória

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const novaTarefa = req.body;
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
