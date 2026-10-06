# Simple Projects API

API REST em Node.js, Express, TypeScript, TypeORM e MySQL, organizada conforme o diagrama do banco.

## Preparação

1. Crie um banco MySQL vazio (por padrão, `nodeapi`).
2. Copie `.env.example` para `.env` e ajuste os dados de conexão.
3. Execute `npm install`.
4. Execute `npm start`. As migrations pendentes são aplicadas na inicialização.
5. Em outra execução, `npm run seed` cria valores iniciais para as situações e categorias.

`npm run dev` compila e inicia a API com reinicialização ao alterar os arquivos compilados.

## Recursos

Todos os recursos oferecem `GET /api/<recurso>`, `GET /api/<recurso>/:id`, `POST`, `PATCH /:id` e `DELETE /:id`.

| Recurso | Campos para criação/edição |
| --- | --- |
| `/api/situations` | `nameSituation` |
| `/api/users` | `name`, `email`, `situationId` |
| `/api/product-categories` | `name` |
| `/api/product-situations` | `name` |
| `/api/products` | `name`, `productSituationId`, `productCategoryId` |

Listagens aceitam `page` e `limit`, por exemplo `/api/products?page=2&limit=20`. O padrão é página 1 com 10 itens; o limite máximo é 100. A resposta contém `data` e metadados em `pagination`.

As relações e nomes das tabelas seguem o diagrama. `migrations` é a tabela de controle criada e mantida pelo TypeORM; não é um recurso CRUD da API.
