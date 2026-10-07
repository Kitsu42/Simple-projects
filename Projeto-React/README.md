# API de cadastro com TypeORM e MySQL

Este projeto é uma API REST em Node.js usando Express, TypeScript e TypeORM para gerenciar entidades de domínio relacionadas a usuários, situações e produtos.

A estrutura foi pensada para ser simples e reutilizável: cada entidade possui um endpoint CRUD genérico, com validação básica, paginação e suporte a relações entre tabelas.

## Objetivo do projeto

A API serve como backend para operações de cadastro e consulta de:

- situações de usuário
- usuários
- categorias de produto
- situações de produto
- produtos

Ela usa MySQL como banco de dados relacional e aplica a estrutura do schema via migrations do TypeORM.

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- dotenv

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter:

1. Node.js instalado
2. MySQL em execução
3. Um banco de dados criado (o padrão configurado é `nodeapi`)
4. Uma base de dados acessível com usuário e senha válidos

---

## Configuração do ambiente

O projeto usa variáveis de ambiente. Copie o arquivo `.env.example` para `.env` e ajuste os valores:

```env
PORT=8080
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nodeapi
DB_USERNAME=root
DB_PASSWORD=change-me
DB_LOGGING=false
```

### Observações importantes

- `DB_DIALECT` foi validado para `mysql` no arquivo de conexão.
- O projeto não foi configurado para PostgreSQL; se o valor for diferente de `mysql`, a aplicação falha ao iniciar.
- `PORT` define a porta em que a API será aberta.

---

## Estrutura do projeto

```text
Projeto-React/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── controllers/
│   │   └── crudController.ts
│   ├── entities/
│   │   ├── Product.ts
│   │   ├── ProductCategory.ts
│   │   ├── ProductSituation.ts
│   │   ├── Situation.ts
│   │   └── User.ts
│   ├── migrations/
│   │   └── InitialSchema.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   └── crudService.ts
│   ├── data-source.ts
│   ├── index.ts
│   └── seed.ts
├── tsconfig.json
└── dist/ (gerado após build)
```

---

## Como o projeto funciona

### 1) Inicialização da aplicação

O arquivo `src/index.ts` é o ponto de entrada da API.

Ele faz quatro coisas principais:

- importa o pacote `reflect-metadata`, necessário para que decorators do TypeORM funcionem corretamente
- carrega as variáveis do arquivo `.env`
- instancia o servidor Express
- inicializa o DataSource do TypeORM antes de subir a aplicação

Fluxo resumido:

```ts
const app = express();
app.use(express.json());
app.use("/api", apiRouter);
```

Isso significa que todas as rotas da API ficam sob o prefixo `/api`.

O método `start()` chama:

```ts
await AppDataSource.initialize();
await AppDataSource.runMigrations();
```

Ou seja, na inicialização a aplicação:

1. conecta ao banco
2. valida as entidades e configuração
3. aplica as migrations pendentes
4. sobe o servidor

---

### 2) Conexão com o banco de dados

O arquivo `src/data-source.ts` centraliza a configuração do TypeORM.

Ele cria um `DataSource` com as opções de conexão MySQL:

- host
- porta
- usuário
- senha
- nome do banco
- entidades mapeadas
- migrations

Também limita o projeto ao dialeto MySQL:

```ts
const dialect = process.env.DB_DIALECT ?? "mysql";
if (dialect !== "mysql") throw new Error("Este projeto está configurado para MySQL (DB_DIALECT=mysql).");
```

Essa validação previne que a aplicação seja executada com outra base de dados sem intenção explícita.

### Para que serve

Esse arquivo define a ponte entre a aplicação e o banco. Sem ele, o TypeORM não saberia onde e como conectar, nem quais entidades devem ser armazenadas.

---

### 3) Rotas da API

O arquivo `src/routes/index.ts` monta todas as rotas públicas da aplicação.

Ele instância um router do Express e cria rotas gerais para cada entidade:

```ts
router.get("/", (_req, res) => res.json({ name: "Simple Projects API", status: "online" }));
```

Essa rota raiz apenas confirma que a API está no ar.

A função `mount()` é o coração do roteamento. Ela cria, para cada entidade, as operações básicas do CRUD:

- `GET /<recurso>` → lista registros
- `GET /<recurso>/:id` → busca um registro por ID
- `POST /<recurso>` → cria um novo registro
- `PATCH /<recurso>/:id` → atualiza um registro
- `DELETE /<recurso>/:id` → remove um registro

Exemplo:

```ts
mount("users", User, [{ field: "situation", idField: "situationId" }], ["name", "email", "situationId"]);
```

A função recebe:

- o caminho da rota
- a entidade do TypeORM
- as relações que devem ser carregadas
- os campos obrigatórios no create

Isso reduz a repetição de código e padroniza o comportamento entre todos os endpoints.

---

### 4) Controlador genérico

O arquivo `src/controllers/crudController.ts` encapsula a lógica de controle dos endpoints.

Ele cria um controller reutilizável para qualquer entidade, validando:

- parâmetros de busca
- tipo do corpo da requisição
- campos permitidos
- campos obrigatórios
- IDs positivos
- erros de integridade de banco

#### Funções principais

- `list(req, res)`: pagina os resultados
- `get(req, res)`: busca um item por ID
- `create(req, res)`: cria um registro
- `update(req, res)`: atualiza um registro
- `remove(req, res)`: remove um registro

#### Validações implementadas

- `page` precisa ser maior ou igual a 1
- `limit` deve estar entre 1 e 100
- o corpo deve ser um objeto válido
- somente campos permitidos podem ser enviados
- strings de texto não podem ser vazias
- IDs de relacionamento devem ser inteiros positivos

#### Tratamento de erro

Quando a operação falha por referência inválida ou constraint do banco, o controller responde com `400`. Para outros erros, usa `500`.

Esse padrão ajuda a evitar que a aplicação exponha detalhes internos do banco sem controle.

---

### 5) Camada de serviço

O arquivo `src/services/crudService.ts` concentra a lógica principal de acesso ao banco.

A classe `CrudService` fornece operações genéricas para qualquer repositório do TypeORM:

- `list(page, limit)`
- `find(id)`
- `create(input)`
- `update(entity, input)`
- `remove(entity)`

#### Como funciona a paginação

A listagem usa:

```ts
const [data, total] = await this.repository.findAndCount({
  relations: ...,
  skip: (page - 1) * limit,
  take: limit,
  order: { id: "ASC" }
});
```

Isso retorna:

- os registros da página atual
- o total geral de registros
- informações de paginação para o cliente

#### Como as relações são processadas

A função `withRelations()` converte IDs recebidos em objetos relacionados, por exemplo:

```ts
{ situationId: 2 } -> { situation: { id: 2 } }
```

Esse padrão é essencial porque o TypeORM trabalha melhor com objetos relacionados em entidades com `@ManyToOne`.

---

### 6) Entidades do banco

A pasta `src/entities` contém os modelos mapeados para as tabelas do banco. Cada arquivo representa uma tabela e usa decorators do TypeORM.

#### `src/entities/Situation.ts`

```ts
@Entity({ name: "situations" })
export class Situation {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: "varchar", length: 255 }) nameSituation!: string;
  ...
  @OneToMany(() => User, (user) => user.situation) users!: User[];
}
```

Serve para guardar valores como:

- Ativo
- Inativo

A relação `@OneToMany` mostra que um `Situation` pode estar associado a vários usuários.

#### `src/entities/User.ts`

Representa a tabela `users`.

Campos:

- `id`
- `name`
- `email`
- `situationId` via relacionamento com `Situation`
- `createdAt`
- `updatedAt`

A anotação `@ManyToOne` cria o vínculo entre usuário e situação.

#### `src/entities/ProductCategory.ts`

Representa a tabela `product_categories`.

Armazena categorias como:

- Geral
- Eletrônicos
- Alimentos

#### `src/entities/ProductSituation.ts`

Representa a tabela `product_situations`.

Armazena status de disponibilidade, por exemplo:

- Disponível
- Indisponível

#### `src/entities/Product.ts`

Representa a tabela `products`.

Possui relação com:

- `ProductSituation`
- `ProductCategory`

Ou seja, cada produto está vinculado a uma categoria e a um status de disponibilidade.

---

### 7) Migrations

O arquivo `src/migrations/InitialSchema.ts` cria a estrutura inicial do banco.

Ele usa `MigrationInterface` do TypeORM para executar SQL na criação das tabelas.

As tabelas criadas são:

- `situations`
- `product_categories`
- `product_situations`
- `users`
- `products`

#### Observação importante

As foreign keys garantem integridade referencial:

- `users.situationId` referencia `situations.id`
- `products.productSituationId` referencia `product_situations.id`
- `products.productCategoryId` referencia `product_categories.id`

Esses `onDelete: "RESTRICT"` impedem exclusão indevida de registros que ainda são referenciados por outros dados.

---

### 8) Seed de dados iniciais

O arquivo `src/seed.ts` é responsável por inserir registros iniciais no banco.

Ele executa:

```ts
await AppDataSource.initialize();
await AppDataSource.runMigrations();
```

Em seguida, insere dados se ainda não existirem:

- situações: `Ativo`, `Inativo`
- categorias: `Geral`, `Eletrônicos`, `Alimentos`
- estados de produto: `Disponível`, `Indisponível`

Esse processo evita duplicação ao verificar se o registro já existe antes de salvar.

A funcionalidade é útil para preparar o banco em desenvolvimento ou em testes.

---

## Endpoints disponíveis

Os endpoints da API seguem o padrão abaixo.

| Recurso | Descrição |
| --- | --- |
| `/api` | Verifica se a API está online |
| `/api/situations` | CRUD de situações |
| `/api/users` | CRUD de usuários |
| `/api/product-categories` | CRUD de categorias de produto |
| `/api/product-situations` | CRUD de situações de produto |
| `/api/products` | CRUD de produtos |

### Regras gerais de payload

Os dados esperados no corpo das requisições seguem os modelos:

#### `situations`

```json
{
  "nameSituation": "Ativo"
}
```

#### `users`

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "situationId": 1
}
```

#### `product-categories`

```json
{
  "name": "Eletrônicos"
}
```

#### `product-situations`

```json
{
  "name": "Disponível"
}
```

#### `products`

```json
{
  "name": "Notebook",
  "productSituationId": 1,
  "productCategoryId": 2
}
```

### Paginação

As listagens suportam `page` e `limit`:

```http
GET /api/products?page=1&limit=10
```

Resposta padrão:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

## Scripts disponíveis

No arquivo `package.json` há os seguintes comandos:

```bash
npm install
npm run build
npm start
npm run seed
npm run dev
```

### Descrição dos scripts

- `build`: compila o TypeScript para a pasta `dist`
- `start`: compila e inicia a API
- `seed`: compila e popula dados iniciais
- `watch`: observa mudanças em TypeScript
- `start:watch`: inicia o watcher e a API em paralelo
- `dev`: compila e reinicia a API quando arquivos compilados mudam

---

## Fluxo prático de uso

1. Configure o `.env`
2. Crie o banco MySQL
3. Instale as dependências com `npm install`
4. Execute `npm start` para subir a API
5. Execute `npm run seed` para popular registros básicos
6. Utilize os endpoints em `/api/...`

---

## Observações finais

Este projeto serve como exemplo de arquitetura simples para APIs REST em TypeScript com:

- mapeamento de entidades
- relacionamento entre tabelas
- reutilização de CRUD
- validação de entrada
- paginação
- migrations para versionamento do banco

A abordagem genérica reduz duplicação de código, enquanto mantém a aplicação fácil de evoluir com novos recursos.

---

## Dica para evolução

Se você quiser expandir o projeto no futuro, os pontos mais naturais para evoluir são:

- autenticação e autorização
- upload de imagens
- filtros e ordenação por campos específicos
- validação mais robusta com bibliotecas como `zod` ou `class-validator`
- documentação com Swagger/OpenAPI
