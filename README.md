# Projeto Trybe Futebol Clube (TFC)

# Contexto
O TFC é um site informativo sobre partidas e classificações de futebol!

O objetivo desse projeto foi desenvolver uma API REST, aplicando os conhecimentos adquiridos sobre TDD e SOLID, para abastecer a interface fornecida pela Trybe.

A integração das aplicações foi feita com o Docker Compose e o resultado é o que você pode ver na imagem abaixo :smiley:

![Preview da aplicação](preview.png)

# Tecnologias usadas

* Node.js
* Express
* Typescript
* Sequelize
* Mocha
* Chai
* Sinon
* Docker

<br>

# Orientações

<details>
  <summary><strong>Instalando o projeto</strong></summary><br />

  1. Clone o repositório:

  ```
  git clone git@github.com:riquelmebandeira/projeto-trybe-futebol-clube.git
  ```

  2. Entre na pasta do repositório clonado e instale as dependências:

  ```
  cd projeto-trybe-futebol-clube
  ```

  3. Instale as aplicações front-end e back-end com o comando:

  ```
  npm run install:apps
  ```

<br>

</details>

<details>
  <summary><strong>Rodando o projeto</strong></summary><br />

  * Para rodar o projeto com o Docker, utilize o comando:

  ```
  npm run compose:up
  ```

  A interface ficará disponível no endereço: http://localhost:3000

  * Para encerrar a aplicação, utilize o comando:

  ```
  npm run compose:down
  ```
  ---
  Para rodar as aplicações separadamente, é necessário configurar um arquivo __.env__ a partir do modelo disponível em __app/backend/.env.example__

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

<br>

</details>

<details>
  <summary><strong>Executando os testes</strong></summary><br />

  * Para executar os testes de integração da API, execute:
  ```
  cd app/backend
  npm test
  ```

  * Para verificar a cobertura de testes, execute:
  ```
  npm run test:coverage
  ```

</details>

<br>

# Rotas
<details>
  <summary><strong>/login</strong></summary><br />

* `POST /login` <br />

  Espera esta estrutura no body da requisição:
  ```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ``` 
  
  Retorna:
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "123.456.789"
  }
  ``` 
  HTTP STATUS: `200 OK`

<br />

* `GET /login/validate` <br />
  Espera receber um token válido nos headers da requisição.
  ```json
  {
    "authorization": "123.456.789"
  }
  ```

  Retorna:
  ```json
  "admin"
  ``` 
  HTTP STATUS: `200 OK`

</details>

<details>
  <summary><strong>/clubs</strong></summary><br />

* `GET /clubs`
  
  Retorna:
  ```json
  [
    {
      "id": 1,
      "clubName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "clubName": "Bahia"
    },
    ...
  ]
  ``` 
  HTTP STATUS: `200 OK`

<br />
 
* `GET /clubs/:id`

  Retorna:
  ```json
  {
    "id": 5,
    "clubName": "Cruzeiro"
  }
  ``` 
  HTTP STATUS: `200 OK`

</details>  

<details>
  <summary><strong>/matchs</strong></summary><br />

* `GET /matchs`

  Retorna:
  ```json
  [
    {
      "id": 1,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": 16,
      "awayTeam": 8,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Grêmio"
      }
    },
    ...
    {
      "id": 48,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": 13,
      "awayTeam": 2,
      "homeClub": {
        "clubName": "Real Brasília"
      },
      "awayClub": {
        "clubName": "Bahia"
      }
    }
  ]
  ``` 
  HTTP STATUS: `200 OK`

<br />

* `GET /matchs?inProgress`

  Retorna as partidas que estão, ou não, em andamento, baseado no parâmetro `inProgress`.

  
  Exemplo de retorno usando `/matchs?inProgress=true`:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "São Paulo"
      },
      "awayClub": {
        "clubName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeClub": {
        "clubName": "Ferroviária"
      },
      "awayClub": {
        "clubName": "Avaí/Kindermann"
      }
    }
  ]
  ``` 
  HTTP STATUS: `200 OK`

<br />

* `POST /matchs`

  Espera receber um token válido nos headers da requisição.
  ```json
  {
    "authorization": "123.456.789"
  }
  ```

  Espera esta estrutura no body da requisição:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
  ``` 
  
   Retorna:
  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ``` 
  HTTP STATUS: `201 CREATED`

<br />

* `PATCH /matchs/:id/finish`


  Espera receber um token válido nos headers da requisição.
  ```json
  {
    "authorization": "123.456.789"
  }
  ```

  HTTP STATUS: `200 OK`

<br />

* `PATCH /matchs/:id` 

  Espera receber um token válido nos headers da requisição.
  ```json
  {
    "authorization": "123.456.789"
  }
  ```

  Espera esta estrutura no body da requisição:
  ```json
   {
     "homeTeamGoals": 3,
     "awayTeamGoals": 1
   }
  ``` 
  
  HTTP STATUS: `200 OK`

<br />

</details>

<details>
  <summary><strong>/leaderboard</strong></summary><br />

* `GET /leaderboard` 

  Retorna:
  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    ...
  ]
  ``` 
  
  HTTP STATUS: `200 OK`

<br />

* `GET /leaderboard/home`

   Retorna:
  ```json
  [
     {
		"name": "Santos",
		"totalVictories": 3,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 9,
		"goalsOwn": 3,
		"totalPoints": 9,
		"goalsBalance": 6,
		"totalGames": 3,
		"efficiency": 100
	 },
      ...
  ]

  ``` 
  
  HTTP STATUS: `200 OK`

<br />

* `GET /leaderboard/away`

 
  Retorna:
  ```json
  [
     {
		"name": "Palmeiras",
		"totalVictories": 2,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 7,
		"goalsOwn": 0,
		"totalPoints": 6,
		"goalsBalance": 7,
		"totalGames": 2,
		"efficiency": 100
	 },
      ...
  ]

  ``` 
  
  HTTP STATUS: `200 OK`

<br />

</details>

