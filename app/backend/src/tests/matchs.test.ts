import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const allMatchesMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
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
  }
]

const inProgressMatches = [
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

const finishedMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "Internacional"
    },
    "awayClub": {
      "clubName": "Santos"
    }
  }
]

describe('Ao fazer uma requisição do tipo GET para a rota /matchs', () => {
  let chaiHttpResponse: Response;

  describe('E não passar uma query string', () => {
      before(async () => {
        sinon.stub(Match, "findAll" as any)
          .resolves(allMatchesMock as unknown as Match);
  
        chaiHttpResponse = await chai
          .request(app)
          .get('/matchs');
      });
    
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })
    
      it('A resposta deve conter o código de status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
  
      it('A requisição deve retornar um array no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
      });
  
      it('Tal array deve conter objetos', () => {
        expect(chaiHttpResponse.body).to.be.deep.members(allMatchesMock);
      });
  });

  describe('E utilizar a query string "inProgress=true"', () => {
      before(async () => {
        sinon.stub(Match, "findAll" as any)
          .resolves(inProgressMatches as unknown as Match);
  
        chaiHttpResponse = await chai
          .request(app)
          .get('/matchs?inProgress=true');
      });
    
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })
    
      it('A resposta deve conter o código de status 200', () => {
        expect(chaiHttpResponse).to.have.status(200);
      });
  
      it('A requisição deve retornar um array no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
      });
  
      it('Tal array deve conter objetos com a propriedade "inProgress" de valor "true"', () => {
        expect(chaiHttpResponse.body).to.be.deep.members(inProgressMatches);
      });
  });

  describe('E utilizar a query string "inProgress=false"', () => {
    before(async () => {
      sinon.stub(Match, "findAll" as any)
        .resolves(inProgressMatches as unknown as Match);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs?inProgress=false');
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um array no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('Tal array deve conter objetos com a propriedade "inProgress" de valor "false"', () => {
      expect(chaiHttpResponse.body).to.be.deep.members(inProgressMatches);
    });
  });
})