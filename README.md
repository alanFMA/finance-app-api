# 📊 Finance App API

API RESTful para um aplicativo de controle financeiro, do [Curso Fullstack Club](https://www.fullstackclub.com.br/) construída com **Node.js** e **TypeScript**, seguindo os princípios da **Arquitetura Limpa (Clean Architecture)**.

Este projeto foi inicialmente desenvolvido em **JavaScript**, mas como um desafio de aprendizado, foi **refatorado completamente para TypeScript** para garantir robustez, manutenibilidade e segurança de tipos de ponta a ponta.

---

## 🏗 Arquitetura do Projeto

A aplicação é estruturada em camadas distintas para garantir a separação de responsabilidades e o baixo acoplamento, facilitando testes e futuras manutenções.  
A regra principal é a **Inversão de Dependência**, onde as camadas mais internas (lógica de negócio) não conhecem detalhes de implementação das camadas externas (frameworks, banco de dados).

---

## 🔑 Conceitos Chave Implementados

- **Clean Architecture** → separação clara entre as camadas de Domínio (Lógica de Negócio), Aplicação e Infraestrutura.  
- **Inversão de Dependência** → as camadas de negócio dependem de **Contratos (Interfaces)**, não de implementações concretas.  
- **Injeção de Dependência** → as dependências são injetadas nas classes via construtores, com a orquestração centralizada nas **Factories (Composition Root)**.  
- **Repository Pattern** → abstrai a camada de acesso a dados, permitindo que a lógica de negócio seja agnóstica em relação ao banco de dados ou ORM.  
- **DTOs (Data Transfer Objects)** → tipos derivados dos **schemas Zod (`z.infer`)** servem como a fonte única da verdade para os dados entre camadas, garantindo consistência e segurança.  

---

## 📂 Estrutura de Pastas

```bash
src/
├── controllers/       # Camada de Apresentação (recebe requisições e envia respostas)
├── database/          # Configuração e instância do cliente Prisma
├── errors/            # Erros customizados da aplicação
├── factories/         # Composition Root (cria e conecta as classes)
├── generated/         # Cliente Prisma gerado automaticamente
├── repositories/      # Camada de Acesso a Dados (implementações e interfaces)
├── schemas/           # Schemas de validação com Zod
├── types/             # Tipos de domínio, DTOs e interfaces
├── use-cases/         # Camada de Lógica de Negócio (orquestra os repositórios)
└── ...
index.ts               # Ponto de entrada da aplicação (servidor Express)
```
## ⚙️ Stack de Tecnologias

- **Linguagem**: TypeScript (Strict Mode)  
- **Ambiente**: Node.js (ES Modules)  
- **Framework**: Express.js  
- **ORM**: Prisma  
- **Banco de Dados**: PostgreSQL (orquestrado com Docker)  
- **Validação**: Zod  
- **Desenvolvimento**: tsx para hot-reloading  

---

## 🚀 Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos
- [NodeJS](https://nodejs.org/en/download/) (v18 ou superior)  
- [Docker](https://www.docker.com/) e Docker Compose  
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
  
### 📥 1. Clone o Repositório
```bash
git clone https://github.com/alanFMA/finance-app-api.git
cd finance-app-api
```

### 📦 2. Instale as Dependências
```bash
npm install
```

### ⚙️ 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto, copiando o exemplo de `.env.example`:

```bash
cp .env.example .env
```

> A `DATABASE_URL` fornecida já funciona com o ambiente **Docker** criado pelo `docker-compose.yml`.  
> Ela aponta para `localhost:5432` (porta exposta pelo contêiner) e usa as credenciais definidas no `docker-compose.yml`.

### 🐳 4. Suba o Banco de Dados com Docker
```bash
docker-compose up -d
```

> 🔎 Nota para usuários de **WSL**: se o serviço do Docker não estiver rodando, inicie com:  
> ```bash
> sudo dockerd > /dev/null 2>&1 &
> ```

### 🗄 5. Aplique as Migrações do Prisma
```bash
npx prisma migrate dev
```

### ▶️ 6. Inicie a Aplicação
```bash
npm run start:dev
```

A API estará rodando em: [http://localhost:8000](http://localhost:8000)

---

## 📌 Próximos Passos (Roadmap)

- [ ] **Testes (Vitest)** → unitários, integração e End-to-End  
- [ ] **Autenticação e Autorização (JWT)** → proteger endpoints com segurança

---

✍️ Desenvolvido por [**Alan Felipe (alanFMA)**](https://github.com/alanFMA)

