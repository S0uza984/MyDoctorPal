# MyDoctorPal

Bem-vindo ao **MyDoctorPal**, um aplicativo para gerenciamento de informações médicas.

---

## 🚀 Visão Geral

O MyDoctorPal é uma aplicação web para cadastro, acompanhamento e gestão de pacientes, médicos e consultas.  
Este guia irá te ajudar a rodar o projeto localmente em poucos passos.

---

## 🛠️ Pré-requisitos

Antes de começar, instale:

- **Node.js** (v16 ou superior) — [Download](https://nodejs.org/)
- **npm** (já vem com o Node.js)
- **MySQL** — [Download](https://dev.mysql.com/downloads/installer/)
- **Git** — [Download](https://git-scm.com/)

---

## ⚡ Instalação e Deploy Local

### 1. Clone o repositório

```bash
git clone https://github.com/S0uza984/MyDoctorPal.git
cd MyDoctorPal
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Banco de Dados

1. Certifique-se de que o MySQL está rodando.
2. Crie o banco de dados chamado `mydoctorpal`:
   - Execute o arquivo `setup.sql` (fornecido no repositório) usando o MySQL Workbench ou pelo terminal:
     ```bash
     mysql -u seu_usuario -p < database/setup.sql
     ```
   - Ou copie o conteúdo de `setup.sql` e rode no seu gerenciador MySQL.

3. Configure o arquivo `.env`:
   - Copie `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` e preencha as variáveis com as credenciais do seu banco local:
     ```
     DATABASE_URL=mysql://seu_usuario:sua_senha@localhost:3306/mydoctorpal
     ```

### 4. Configure o Prisma

- Gere o client Prisma e aplique as migrações:
  ```bash
  npx prisma generate
  npx prisma migrate deploy
  ```

### 5. Rode o Projeto

- Para rodar em modo produção (recomendado para testar o deploy):
  ```bash
  npm run build
  npm start
  ```
  O servidor estará disponível em: [http://localhost:3000](http://localhost:3000)

- Para rodar em modo desenvolvimento:
  ```bash
  npm run dev
  ```

---

## 🧑‍💻 Dicas Úteis

- Para visualizar e editar dados do banco, use o [Prisma Studio](https://www.prisma.io/studio):
  ```bash
  npx prisma studio
  ```
- Se alterar o arquivo `schema.prisma`, sempre rode:
  ```bash
  npx prisma generate
  ```

---

## 📂 Estrutura do Projeto

- `src/` — Código-fonte da aplicação
- `prisma/` — Arquivos do Prisma e o schema do banco
- `database/setup.sql` — Script para criar as tabelas no MySQL
- `.env.example` — Exemplo de configuração de ambiente

---

## ❓ Dúvidas

Se tiver qualquer dúvida, abra uma issue no [repositório](https://github.com/S0uza984/MyDoctorPal/issues).

---

Feito com 💙 por Diego Henrique Costa Souza, Gustavo Morandi, Gustavo Campos e Henrique de Medeiros.