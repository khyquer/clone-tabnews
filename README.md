# clone-tabnews

Projeto do curso.dev do Felipe Deschamps (@filipedeschamps)

## 📋 Sobre o Projeto

Este projeto é um clone do TabNews desenvolvido seguindo os princípios de **Test-Driven Development (TDD)** com JavaScript, Node.js e Next.js.

## 🎯 Implementação TDD - Feature de Usuários

A feature de gerenciamento de usuários foi implementada seguindo os três estágios do TDD:

### 🔴 Estágio RED (Testes Failing)

Neste estágio, os testes foram criados **antes** da implementação, garantindo que falhassem inicialmente:

#### Testes Criados:

**POST /api/v1/users** (`tests/integration/api/v1/users/post.test.js`):
- ✅ Deve retornar 201 e criar usuário com sucesso
- ✅ Deve retornar 400 quando username está faltando
- ✅ Deve retornar 400 quando email está faltando
- ✅ Deve retornar 400 quando email é inválido

**GET /api/v1/users** (`tests/integration/api/v1/users/get.test.js`):
- ✅ Deve retornar 200 e listar usuários
- ✅ Deve retornar array vazio quando não há usuários

### 🟢 Estágio GREEN (Implementação Mínima)

Implementação mínima necessária para fazer os testes passarem:

#### 1. Migration Criada
- **Arquivo**: `infra/migrations/1736540000000_create-users-table.js`
- **Tabela**: `users`
- **Campos**:
  - `id` (SERIAL PRIMARY KEY)
  - `username` (VARCHAR(255) UNIQUE NOT NULL)
  - `email` (VARCHAR(255) UNIQUE NOT NULL)
  - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

#### 2. Endpoint Implementado
- **Arquivo**: `pages/api/v1/users/index.js`
- **Métodos**:
  - `POST /api/v1/users` - Criar usuário
  - `GET /api/v1/users` - Listar usuários

### 🔵 Estágio BLUE (Refatoração)

Refatoração do código para melhorar qualidade, manutenibilidade e seguir boas práticas:

#### Melhorias Aplicadas:

1. **Separação de Responsabilidades**:
   - `validateUserData()` - Validação de dados de entrada
   - `formatUserResponse()` - Formatação da resposta
   - `createUser()` - Lógica de criação no banco
   - `listUsers()` - Lógica de listagem do banco

2. **Validações Robustas**:
   - Validação de tipos (string)
   - Validação de email com regex
   - Validação de campos não vazios após trim
   - Mensagens de erro descritivas

3. **Tratamento de Erros**:
   - Tratamento específico para violação de unicidade (409 Conflict)
   - Logging de erros para debugging
   - Mensagens de erro claras e informativas

4. **Melhorias de Dados**:
   - Email normalizado para lowercase
   - Username e email com trim automático
   - Query otimizada no GET (seleciona apenas campos necessários)

5. **Isolamento de Testes**:
   - Setup correto do banco de dados nos testes
   - Limpeza de dados entre testes para garantir isolamento
   - Criação da tabela no `beforeAll` de cada suite de testes

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- Docker Desktop instalado e rodando
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install
```

### Configuração do Ambiente

Certifique-se de ter o arquivo `.env.development` configurado com as variáveis de ambiente do banco de dados:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=seu_database
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
DATABASE_URL=postgresql://usuario:senha@localhost:5432/database
```

### Executando o Projeto

```bash
# Subir os serviços (Docker)
npm run services:up

# Executar migrations
npm run migration:up

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📁 Estrutura do Projeto

```
clone-tabnews/
├── infra/
│   ├── compose.yaml              # Configuração Docker
│   ├── database.js              # Cliente de banco de dados
│   └── migrations/
│       └── 1736540000000_create-users-table.js
├── pages/
│   ├── api/
│   │   └── v1/
│   │       ├── migrations/      # Endpoint de migrations
│   │       ├── status/          # Endpoint de status
│   │       └── users/           # Endpoint de usuários (NOVO)
│   └── index.js
├── tests/
│   └── integration/
│       └── api/
│           └── v1/
│               ├── migrations/   # Testes de migrations
│               ├── status/       # Testes de status
│               └── users/        # Testes de usuários (NOVO)
│                   ├── get.test.js
│                   └── post.test.js
├── package.json
├── jest.config.js
└── README.md
```

## 🧪 Testes

### Cobertura de Testes

A feature de usuários possui cobertura completa de testes:

- ✅ Criação de usuário com sucesso
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Listagem de usuários
- ✅ Listagem quando não há usuários
- ✅ Isolamento entre testes

### Executando Testes Específicos

```bash
# Testar apenas usuários
npm test -- users

# Testar apenas POST de usuários
npm test -- post.test.js
```

## 📝 API Endpoints

### POST /api/v1/users

Cria um novo usuário.

**Request:**
```json
{
  "username": "usuario123",
  "email": "usuario@example.com"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "username": "usuario123",
  "email": "usuario@example.com",
  "created_at": "2025-01-10T12:00:00.000Z"
}
```

**Erros:**
- `400 Bad Request` - Dados inválidos ou faltando
- `409 Conflict` - Username ou email já existe
- `500 Internal Server Error` - Erro no servidor

### GET /api/v1/users

Lista todos os usuários.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@example.com",
    "created_at": "2025-01-10T12:00:00.000Z"
  },
  {
    "id": 2,
    "username": "outro_usuario",
    "email": "outro@example.com",
    "created_at": "2025-01-10T13:00:00.000Z"
  }
]
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run services:up      # Sobe serviços Docker
npm run services:stop    # Para serviços Docker
npm run services:down    # Remove serviços Docker

# Migrations
npm run migration:create # Cria nova migration
npm run migration:up     # Executa migrations pendentes

# Testes
npm test                 # Executa todos os testes
npm run test:watch       # Executa testes em modo watch

# Linting
npm run lint:check       # Verifica formatação
npm run lint:fix         # Corrige formatação
```

## 🎓 Aprendizados TDD

### Ciclo Red-Green-Refactor

1. **RED**: Escrever um teste que falha
2. **GREEN**: Escrever código mínimo para passar
3. **REFACTOR**: Melhorar o código mantendo os testes passando

### Benefícios Aplicados

- ✅ Cobertura de testes desde o início
- ✅ Design orientado por testes
- ✅ Refatoração segura
- ✅ Documentação viva através dos testes
- ✅ Confiança nas mudanças

## 📚 Tecnologias Utilizadas

- **Next.js 13** - Framework React
- **Node.js** - Runtime JavaScript
- **PostgreSQL** - Banco de dados
- **Jest** - Framework de testes
- **node-pg-migrate** - Gerenciamento de migrations
- **Docker** - Containerização

## 👤 Autor

Projeto do curso.dev do Felipe Deschamps (@filipedeschamps)

## 📄 Licença

MIT