README
# MyDoctorPal

Bem-vindo ao **MyDoctorPal**, um aplicativo para gerenciamento de informações médicas. Este guia fornece todas as instruções necessárias para configurar o projeto localmente.

---

## **Pré-requisitos**

Antes de começar, certifique-se de que você tem os seguintes itens instalados no seu computador:

1. **Node.js** (versão 16 ou superior)
   - Faça o download e instale o Node.js a partir do site oficial: [Node.js](https://nodejs.org/).
   - Após a instalação, verifique se o Node.js está funcionando:
     ```bash
     node -v
     ```
     O comando acima deve exibir a versão do Node.js instalada.

2. **Gerenciador de Pacotes** (npm, yarn ou pnpm)
   - O `npm` já vem instalado com o Node.js. Para verificar:
     ```bash
     npm -v
     ```

3. **MySQL**
   - Instale o MySQL no seu computador. Você pode baixar o instalador no site oficial: [MySQL](https://dev.mysql.com/downloads/installer/).
   - Certifique-se de que o MySQL está rodando e que você tem as credenciais de acesso (usuário, senha, etc.).

4. **Git**
   - Certifique-se de que o Git está instalado. Você pode baixá-lo aqui: [Git](https://git-scm.com/).
   - Verifique a instalação:
     ```bash
     git --version
     ```

---

## **Passo a Passo para Configuração**

### 1. Clone o Repositório
Faça o clone do repositório para o seu computador:
```bash
git clone https://github.com/seu-usuario/mydoctorpal.git
cd mydoctorpal

### 2. Instale as Dependências
Instale as dependências do projeto usando o gerenciador de pacotes de sua escolha (npm, yarn ou pnpm). Por exemplo, com npm:
npm install

### 3. Configure o Banco de Dados
    1.	Certifique-se de que o MySQL está rodando no seu computador.
    2.	Crie o banco de dados local(crie com o nome "mydoctorpal"): o Execute o arquivo setup.sql (fornecido no repositório) para criar o banco de dados e as tabelas. Você pode usar uma ferramenta como MySQL Workbench ou rodar o comando no terminal:
mysql -u seu_usuario -p < database/setup.sql

    ou pode só simplesmente copiar o que está escrito no arquivo setup.sql e rodar no MySqlWorkbench
    3.	Configure o arquivo .env:
•	Copie o arquivo .env.example para .env:
   cp .env.example .env
    Edite o arquivo .env e preencha as variáveis com as credenciais do seu banco de dados local. Exemplo:
    DATABASE_URL=mysql://seu_usuario:sua_senha@localhost:3306/mydoctorpal

### 4. Configure o Prisma
Aplique a migração para criar as tabelas no banco de dados:
npx prisma migrate deploy

### 5. Inicie o Servidor de Desenvolvimento
Inicie o servidor localmente:
		npm run dev
O servidor estará disponível em: http://localhost:3000

----------------------------------------------------

### Fluxo de Trabalho em Grupo com Branches e Pull Requests**

Para trabalhar em grupo de forma organizada, siga este fluxo:

#### **1. Branchs Principais (`main` e 'dev')**
- A branch `main` deve conter apenas código estável e pronto para produção.
- Nenhum membro deve fazer commits diretamente na `main`.
-'dev': Branch de desenvolvimento principal. Todas as novas funcionalidades e correções devem ser mescladas na dev antes de serem enviadas para a main.

#### **2. Criação de Branches**
- Cada membro deve criar uma branch, apartir da dev para trabalhar em uma nova funcionalidade ou correção de bug.
- Nomeie as branches de forma descritiva:
  -  Exemplo: `feature-login`, `fix-database-connection`.
-Comandos para criar uma branch de feature:
-git checkout dev
-git pull origin dev
-git checkout -b feature-nome-da-tarefa

#### **3. Pull Requests**
- Após concluir o trabalho em uma branch, o membro deve abrir um **Pull Request (PR)** para a branch `dev`.
-Comandos para enviar a branch de feature para o repositório remoto
git add .
git commit -m "Descrição do que foi feito"
git push origin feature-nome-da-tarefa
- Outros membros devem revisar o PR antes de aprová-lo e mesclá-lo.

#### **4. Atualização Local**
- Antes de começar a trabalhar, cada membro deve atualizar sua branch local com as mudanças mais recentes da `dev`:
  ```bash
  git checkout dev
  git pull origin dev

#### **5. Mesclando a dev na main
- Quando a branch dev estiver estável e pronta para produção, um membro autorizado pode abrir um Pull Request da dev para a main.
- Após revisão e aprovação, o PR pode ser mesclado.
