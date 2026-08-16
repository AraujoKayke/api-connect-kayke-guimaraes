const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware essencial para ler o corpo JSON
app.use(express.json());

// Dados em memória
let users = [
  { id: 1, name: "Alice Silva", email: "alice@email.com" },
  { id: 2, name: "Bruno Souza", email: "bruno@email.com" }
];
let nextId = 3;

// 1. Listagem Geral (GET) -> Status 200
app.get('/users', (req, res) => {
  return res.status(200).json(users);
});

// 2. Busca por ID (GET) -> Status 200 ou 404
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id, 10));

  if (!user) {
    return res.status(404).json({ error: { status: 404, message: `Usuário com ID ${id} não encontrado.` } });
  }

  return res.status(200).json(user);
});

// 3. Criação de Usuário (POST) -> Status 201 ou 400
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: { status: 400, message: "O campo 'name' é obrigatório." } });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: { status: 400, message: "O campo 'email' é obrigatório e deve ser válido." } });
  }

  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ error: { status: 400, message: "E-mail já cadastrado." } });
  }

  const newUser = { id: nextId++, name: name.trim(), email: email.trim().toLowerCase() };
  users.push(newUser);

  return res.status(201).json({ data: newUser, message: "Usuário cadastrado com sucesso." });
});

// 4. Atualização (PUT) -> Status 200, 400 ou 404
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: { status: 404, message: `Usuário com ID ${id} não encontrado.` } });
  }

  if (!name || !email) {
    return res.status(400).json({ error: { status: 400, message: "Nome e e-mail são obrigatórios." } });
  }

  users[userIndex] = { id: parseInt(id, 10), name: name.trim(), email: email.trim().toLowerCase() };
  return res.status(200).json(users[userIndex]);
});

// 5. Exclusão (DELETE) -> Status 204 ou 404
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: { status: 404, message: `Usuário com ID ${id} não encontrado.` } });
  }

  users.splice(userIndex, 1);
  return res.status(204).send();
});

// Iniciar escuta
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em: http://localhost:${PORT}`);
});