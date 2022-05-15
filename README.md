# Projeto Trybe Futebol Clube (TFC)

# Contexto
O TFC é um site informativo sobre partidas e classificações de futebol!

O objetivo desse projeto foi desenvolver uma API REST, para abastecer a interface previamente fornecida pela Trybe.

Durante o desenvolvimento, foi aplicado a métodologia TDD e os príncipios SOLID. 
A integração do Front-end, Back-end e banco de dados foi feita através do Docker.

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

* Para rodar a aplicação, integrada pelo docker, utilize o comando:

```
npm run compose:up
```

Após subir, a aplicação pode ser acessada pelo endereço http://localhost:3000

* Para encerrar a aplicação, utilize o comando:

```
npm run compose:down
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