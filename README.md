# Projeto Trybe Futebol Clube (TFC)

# Contexto
O TFC é um site informativo sobre partidas e classificações de futebol!

O objetivo desse projeto foi desenvolver uma API REST, para abastecer a interface previamente fornecida pela Trybe.

Durante o desenvolvimento, foi aplicado a métodologia TDD e os príncipios SOLID. 
A integração do Front-end, Back-end e banco de dados foi feita através do Docker Compose.

## Tecnologias usadas

* Node.js
* Express
* Typescript
* Sequelize
* Mocha
* Chai
* Sinon
* Docker

## Instalando dependências

1. Clone o repositório:

```
git clone git@github.com:riquelmebandeira/trybe-futebol-clube.git
```

2. Entre na pasta do repositório clonado e instale as dependências:

```
cd trybe-futebol-clube
```

3. Instale as aplicações front-end e back-end com o comando:

```
npm run install:apps
```


## Executando a aplicação

* Para rodar a aplicação, integrada pelo docker compose, utilize o comando:

```
npm run compose:up
```

Após subir, a aplicação pode ser acessada pelo endereço http://localhost:3000

* Para encerrar a aplicação, utilize o comando:

```
npm run compose:down
```
---
Para rodar as aplicações separadamente, é necessário criar e configurar um arquivo __.env__ a partir do modelo disponível em __app/backend/.env.example__

__(Neste arquivo é obrigatório deixar o nome do database como 'TRYBE_FUTEBOL_CLUBE')__

---
* Para rodar o back-end, execute:

```
cd app/backend
npm start
```

* Para rodar o front-end, execute:

```
cd app/frontend
npm start
```

## Executando testes

* Para executar os testes de integração da API, execute o script:
```
cd app/backend
npm start
npm test
```

* Para verificar a cobertura de testes, com a API rodando, rode o script:
```
npm run test:coverage
```