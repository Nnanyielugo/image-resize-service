import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);

describe('Auth', function(){
  describe('login', function(){

    const user = {
      username: "Jabinco",
      password : "jabinco"
    }
    const noPassword = {
      password: 'jabinco'
    }

    const noUsername = {
      username: 'Jabinco'
    }

    const empty = {}

    it('successfully logs in', function(done){
      chai.request(app)
        .post('/api/login')
        .send(user)
        .end((error, response) => {
          expect(response.body.errors).to.be.undefined;
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('username');
          expect(response.body).to.have.property('token');
          expect(response.body.username).to.equal(user.username);
          expect(response.body.token).to.be.a('string')
          done()
        });
    });

    it('throws error when username is absent', function(done){
      chai.request(app)
      .post('/api/login')
      .send(noPassword)
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect(response.status).to.not.equal(200);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('error');
        expect(response.body.errors.error).to.equal("Username can\'t be blank!")
        done()
      });
    });

    it('throws error when password is absent', function(done){
      chai.request(app)
      .post('/api/login')
      .send(noUsername)
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect(response.status).to.not.equal(200);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('error');
        expect(response.body.errors.error).to.equal("Password can\'t be blank!")
        done()
      });
    });

    it('throws error when login form is empty', function(done){
      chai.request(app)
      .post('/api/login')
      .send(empty)
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect(response.status).to.not.equal(200);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.have.property('error');
        expect(response.body.errors.error).to.equal("Username can\'t be blank!")
        done()
      })
    })
  });
});