# API Connect - Gerenciamento de Usuários

API RESTful desenvolvida como Produto Mínimo Viável (MVP) para o ecossistema de validação da startup. O serviço provê endpoints padronizados para criação, leitura, atualização e exclusão (CRUD) de usuários, com persistência temporária em memória, validação de campos obrigatórios e respostas determinísticas em formato JSON.

---

## Tecnologias Utilizadas

* **Node.js** (Ambiente de execução JavaScript no servidor)
* **Express** (Microframework para gerenciamento de rotas e middlewares HTTP)
* **Nodemon** (Ferramenta de monitoramento e live-reload durante o desenvolvimento)

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (v18 ou superior)
* Git instalado

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO_GITHUB/api-connect-kayke-guimaraes.git](https://github.com/SEU_USUARIO_GITHUB/api-connect-kayke-guimaraes.git)
   cd api-connect-kayke-guimaraes

## Instale as dependências:
```bash
npm install
```
## Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

*Ou em modo convencional:*
```bash
node src/server.js
```
A API estará em execução em: http://localhost:3000

## Referência da API (Endpoints)

| Método | Endpoint | Descrição | Status Sucesso | Status Erro |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/users` | Listagem geral de usuários | `200 OK` | - |
| `GET` | `/users/:id` | Busca detalhada de usuário por ID | `200 OK` | `404 Not Found` |
| `POST` | `/users` | Cadastro de novo usuário | `201 Created` | `400 Bad Request` |
| `PUT` | `/users/:id` | Atualização completa de dados do usuário | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/users/:id` | Exclusão permanente de um usuário | `204 No Content` | `404 Not Found` |

Exemplos de Requisição e Resposta
1. Criar Usuário (POST /users)

```json
{
  "name": "Carlos Eduardo",
  "email": "carlos@email.com"
}
```

Resposta (201 Created):

```json
{
  "data": {
    "id": 3,
    "name": "Carlos Eduardo",
    "email": "carlos@email.com"
  },
  "message": "Usuário cadastrado com sucesso."
}
```

2. Listar Usuários (GET /users)

Resposta (200 OK):

```json
[
  {
    "id": 1,
    "name": "Alice Silva",
    "email": "alice@email.com"
  },
  {
    "id": 2,
    "name": "Bruno Souza",
    "email": "bruno@email.com"
  }
]
```

3. Buscar Usuário por ID (GET /users/:id)

Resposta (200 OK):

```json
{
  "id": 1,
  "name": "Alice Silva",
  "email": "alice@email.com"
}
```

Resposta para ID Inexistente (404 Not Found):

```json
{
  "error": {
    "status": 404,
    "message": "Usuário com ID 777 não encontrado."
  }
}
```

## Estrutura do Projeto

```text
EXP 2/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── app.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```