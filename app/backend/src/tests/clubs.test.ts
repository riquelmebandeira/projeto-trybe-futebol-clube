import { describe } from 'mocha';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import Club from '../database/models/Club'
import clubsMock from './mocks/clubs.json';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao fazer uma requisição do tipo GET para a rota /clubs', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Club, "findAll" as any)
        .resolves(clubsMock as unknown as Club);

      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');
    });
  
    after(() => {
      (Club.findAll as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um array no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('Tal array deve conter objetos', () => {
      expect(chaiHttpResponse.body).to.be.deep.members(clubsMock);
    });

    it('Tais objetos devem possuir a propriedade "id"', () => {
      expect(chaiHttpResponse.body[0]).to.be.have.property('id');
    });

    it('Tais objetos devem possuir a propriedade "clubName"', () => {
      expect(chaiHttpResponse.body[0]).to.be.have.property('clubName');
    });
});

describe('Ao fazer uma requisição do tipo GET para a rota /clubs/id', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Club, "findOne")
        .resolves(clubsMock[0] as unknown as Club);

      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1');
    });
  
    after(() => {
      (Club.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "id"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('id');
    });

    it('Tal objeto deve possuir a propriedade "clubName"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('clubName');
    });
});