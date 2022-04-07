import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Club from '../database/models/Club'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface IClub {
  id: number,
  clubName: string,
}

const findAllMock = [
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	}
]

const findOneMock = {
  "id": 1,
  "clubName": "Avaí/Kindermann"
}

describe('Ao fazer uma requisição do tipo GET para a rota /clubs', () => {
  let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Club, "findAll" as any)
        .resolves(findAllMock as unknown as Club);

      chaiHttpResponse = await chai
        .request(app)
        .post('/clubs');
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
      expect(chaiHttpResponse.body).to.be.deep.members(findAllMock);
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
        .resolves(findOneMock as unknown as Club);

      chaiHttpResponse = await chai
        .request(app)
        .post('/clubs/1');
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