import { describe } from 'mocha';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/Match'
import { inProgressMatches, finishedMatches } from './mocks/matches.json';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao fazer uma requisição do tipo GET para a rota /matchs', () => {
  let chaiHttpResponse: Response;

  describe('E não passar uma query string', () => {
      before(async () => {
        sinon.stub(Match, "findAll" as any)
          .resolves(inProgressMatches as unknown as Match);
  
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
        expect(chaiHttpResponse.body).to.be.deep.members(inProgressMatches);
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
        .resolves(finishedMatches as unknown as Match);

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
      expect(chaiHttpResponse.body).to.be.deep.members(finishedMatches);
    });
  });
})