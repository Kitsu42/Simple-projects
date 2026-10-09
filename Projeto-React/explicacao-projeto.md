# Explicação do projeto Projeto-React

## Visão geral

Este projeto é uma API REST em Node.js, escrita em TypeScript, com Express e TypeORM, para gerenciar cadastros relacionados a usuários e produtos em um banco MySQL.

Mesmo com o nome “Projeto-React”, o código não contém front-end em React. O que existe aqui é um backend (API) que expõe endpoints para criar, listar, buscar, atualizar e excluir registros.

## O que o projeto faz

A aplicação oferece operações CRUD para cinco recursos principais:

- Situações de usuário
- Usuários
- Categorias de produto
- Situações de produto
- Produtos

Esses dados são persistidos em tabelas relacionais no MySQL e a API expõe rotas REST sob o prefixo /api.

## Como o projeto é estruturado

### 1. Arquivo principal de inicialização

O ponto de entrada é [src/index.ts](src/index.ts).

Ele faz o seguinte:

- importa `reflect-metadata` para que os decorators do TypeORM funcionem
- carrega as variáveis de ambiente do arquivo .env
- cria a instância do Express
- monta todas as rotas em /api
- chama `AppDataSource.initialize()` e `AppDataSource.runMigrations()` antes de iniciar o servidor

O servidor fica disponível em uma porta configurada por `PORT` (padrão 8080).

### 2. Configuração da conexão com o banco

O arquivo [src/data-source.ts](src/data-source.ts) centraliza a configuração do TypeORM.

Ele cria um `DataSource` apontando para MySQL com:

- host
- porta
- usuário
- senha
- nome do banco
- entidades
- migrations

Além disso, há uma validação: `DB_DIALECT` precisa ser `mysql`. Se não for, a aplicação falha ao iniciar. Isso mostra que o projeto foi feito para um ambiente MySQL específico.

### 3. Entidades e relacionamento

As entidades estão em [src/entities](src/entities):

- [src/entities/Situation.ts](src/entities/Situation.ts): armazena possíveis situações de usuário, como Ativo e Inativo
- [src/entities/User.ts](src/entities/User.ts): usuário com nome, e-mail e relacionamento com `Situation`
- [src/entities/ProductCategory.ts](src/entities/ProductCategory.ts): categorias de produto
- [src/entities/ProductSituation.ts](src/entities/ProductSituation.ts): situação/estado de um produto
- [src/entities/Product.ts](src/entities/Product.ts): produto relacionado a categoria e situação

A modelagem mostra que:

- cada usuário pertence a uma situação
- cada produto pertence a uma categoria
- cada produto também possui uma situação (disponível/indisponível)

### 4. Migrations

O schema do banco é criado pela migration [src/migrations/InitialSchema.ts](src/migrations/InitialSchema.ts).

Ela cria tabelas como:

- `situations`
- `product_categories`
- `product_situations`
- `users`
- `products`

Também define chaves estrangeiras para garantir integridade referencial entre os dados.

### 5. Rotas REST

As rotas ficam em [src/routes/index.ts](src/routes/index.ts).

Ele usa a função `mount()` para criar rotas CRUD genéricas para cada recurso. Isso evita repetir código manualmente.

Os endpoints gerados incluem:

- GET /api/situations
- GET /api/situations/:id
- POST /api/situations
- PATCH /api/situations/:id
- DELETE /api/situations/:id

E também para:

- users
- product-categories
- product-situations
- products

### 6. Controlador genérico

A lógica HTTP está em [src/controllers/crudController.ts](src/controllers/crudController.ts).

Essa camada:

- valida o corpo da requisição
- valida query params de paginação
- exige campos obrigatórios na criação
- valida IDs positivos
- pega erros de integridade do banco e converte em respostas HTTP comprensíveis

Exemplo de validação:

- `page` precisa ser >= 1
- `limit` precisa estar entre 1 e 100
- campos de texto não podem vir vazios
- relacionamentos devem receber IDs válidos

### 7. Serviço genérico

O serviço em [src/services/crudService.ts](src/services/crudService.ts) é a camada de persistência.

Ele faz:

- `list(page, limit)` com paginação e ordenação
- `find(id)` com carregamento de relacionamentos
- `create(input)` para salvar um novo item
- `update(entity, input)` para alterar um registro existente
- `remove(entity)` para excluir

A parte mais importante é a conversão de campos como `situationId` em objetos relacionados para o TypeORM, usando `withRelations()`.

### 8. Dados iniciais

O script auxiliar [src/seed.ts](src/seed.ts) popula dados de exemplo quando a aplicação inicia.

Ele insere dados padrão como:

- situações de usuário: Ativo, Inativo
- categorias: Geral, Eletrônicos, Alimentos
- estados de produto: Disponível, Indisponível

Esse passo ajuda a deixar o banco pronto para testes e demonstração.

## Como o fluxo de execução funciona

Em linhas gerais, o ciclo é:

1. a aplicação inicia em [src/index.ts](src/index.ts)
2. o TypeORM conecta ao MySQL em [src/data-source.ts](src/data-source.ts)
3. as migrations criam as tabelas
4. as rotas em [src/routes/index.ts](src/routes/index.ts) respondem às requisições
5. o controlador valida os dados e chama o serviço
6. o serviço salva ou consulta os dados no banco
7. a resposta é devolvida em JSON

## Exemplos de uso

### Listar usuários

GET /api/users?page=1&limit=10

### Buscar usuário por ID

GET /api/users/1

### Criar um usuário

POST /api/users

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "situationId": 1
}
```

### Criar um produto

POST /api/products

```json
{
  "name": "Teclado",
  "productSituationId": 1,
  "productCategoryId": 2
}
```

## Dependências principais

O projeto usa:

- Express para servir a API
- TypeORM para mapeamento objeto-relacional
- MySQL2 para conexão com o banco
- dotenv para leitura de variáveis de ambiente
- TypeScript para compilação e tipagem

## Como rodar

No arquivo [package.json](package.json), os scripts principais são:

- `npm run build`: compila TypeScript
- `npm start`: compila e inicia a API
- `npm run seed`: popula dados iniciais
- `npm run dev`: inicia em modo de desenvolvimento

A aplicação depende de um arquivo `.env` com as variáveis do banco. O projeto inclui [Projeto-React/.env.example](.env.example) como referência.

## Conclusão

O projeto é um backend de cadastro e gestão de dados para uma pequena estrutura de usuários e produtos. Ele usa padrões comuns de API REST com Express + TypeORM, foca em reutilização por meio de controladores e serviços genéricos, e garante organização através de migrations e relacionamento entre tabelas.

Por isso, a função central do sistema é servir como uma API de CRUD para um cenário de cadastro de usuários, categorias, situações e produtos em um banco relacional.
