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
  let chaiHttpResponse: Response;

  describe('E enviar dados válidos de um usuário existente', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(userMock as unknown as User);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: '12345678'
        });
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 200', () => {
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

  describe('E enviar um email inexistente', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({email: 'guest@guest.com'});
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    });
  })

  describe('E enviar uma senha incorreta', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(userMock as unknown as User);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'wrongpassword'
        });
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    });
  })

  describe('E não enviar um email', () => {
    before(async () => {
      sinon.stub(User, "findOne")
        .resolves(userMock as unknown as User);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: '12345678'
        });
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('A resposta deve conter o código de status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A requisição deve retornar um objeto no corpo da resposta', () => {
      expect(chaiHttpResponse.body).to.be.a('object');
    });

    it('Tal objeto deve possuir a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.have.property('message');
    });

    it('A mensagem deve possuir o texto "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    });
  })
});
