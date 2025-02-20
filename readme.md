# PPE08_Node_Fastify

API desenvolvida em Node.js com Fastify para gerenciar inscrições em eventos, contabilizar referrals e ranquear usuários com base em suas indicações. A API utiliza **PostgreSQL** para armazenar informações dos inscritos e **Redis** para contabilizar cliques e conversões de referrals. A documentação da API é gerada automaticamente com **Fastify Swagger** e está disponível na rota `/docs`.
<br>
<br>

## Tecnologias utilizadas

- **Linguagem**: TypeScript
- **Framework**: Fastify
- **Banco de dados**:
  - PostgreSQL (Armazenamento de inscrições)
  - Redis (contagem de cliques e conversões de referrals)
- **ORM**: Drizzle
- **Validação**: Zod
- **Documentação**: Fastify Swagger (OpenAPI)
- **Linter**: Biome
- **Build**: Tsup (para gerar builds em formato ESM)
- **Conteinerização**: Docker (PostgresSQL e Redis)
  <br>
  <br>

## Funcionalidades

1. **Cadastro de inscrições**:
   - Cadastro de pessoas em um evento, com ou sem referral.
2. **Contabilização de referrals**:
   - Contabilização de cliques.
   - Contabilização de conversões de referrals.
3. **Ranking de usuários**:

   - Retorna a posição de um usuário no ranking de referrals.
   - Retorna o top 3 usuários com mais conversões de referrals.

4. **Documentação da API**:
   - Documentação automática com Fastify Swagger, disponível em `/docs`.

<br>
<br>

## Rotas da API

Aqui estão as principais rotas disponíveis na API:

### Inscrições

- **POST** `/subscriptions`: Cadastra uma pessoa em um evento.
    - Parâmetros: name, email, referrer (opcional).

### Referrals

- **GET** `/invites/{subscribeId}`: Acessa o link de invite e redireciona o usuário
- **GET** `/subscribers/{subscribeId}/ranking/clicks`: Retorna a quantidade de cliques no referral de um usuário.
- **GET** `/subscribers/{subscribeId}/ranking/count`: Retorna a quantidade de conversões de referrals de um usuário.
- **GET** `/subscribers/{subscribeId}/ranking/position`: Retorna a posição de um usuário no ranking de referrals.

### Ranking

- **GET** `/ranking`: Retorna o top 3 usuários com mais conversões de referrals.