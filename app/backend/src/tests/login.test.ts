import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
    'id': 1,
    'username': 'Admin',
    'role': 'admin',
    'email': 'admin@admin.com',
    'password': '12345678',
}

describe('Ao fazer uma requisição do tipo POST para a rota /login', () => {
  describe('E enviar dados válidos de um usuário existente', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves({
            userMock
          } as unknown as User);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({username: 'Admin', password: '12345678'});
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade user', () => {
      expect(chaiHttpResponse.body).to.be.have.property('user');
    });

    it('Tal objeto deve possuir a propriedade token', () => {
      expect(chaiHttpResponse.body).to.be.have.property('token');
    });
  })
});
