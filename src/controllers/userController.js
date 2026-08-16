let users = [
  { id: 1, name: "Alice Silva", email: "alice@email.com" },
  { id: 2, name: "Bruno Souza", email: "bruno@email.com" }
];
let nextId = 3;

// GET /users
exports.getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

// GET /users/:id
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id, 10));

  if (!user) {
    return res.status(404).json({ error: "Not Found", message: `Usuário com ID ${id} não encontrado.` });
  }

  return res.status(200).json(user);
};

// POST /users
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Bad Request", message: "Nome e e-mail são obrigatórios." });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);
  return res.status(201).json(newUser);
};

// PUT /users/:id
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: "Not Found", message: `Usuário com ID ${id} não encontrado.` });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Bad Request", message: "Nome e e-mail são obrigatórios para atualização." });
  }

  users[userIndex] = {
    id: parseInt(id, 10),
    name,
    email
  };

  return res.status(200).json(users[userIndex]);
};

// DELETE /users/:id
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id, 10));

  if (userIndex === -1) {
    return res.status(404).json({ error: "Not Found", message: `Usuário com ID ${id} não encontrado.` });
  }

  users.splice(userIndex, 1);
  return res.status(204).send();
};