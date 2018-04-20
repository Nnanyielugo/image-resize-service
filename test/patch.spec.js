import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);

describe('patch routes tests', function(){
  const patchBody = {
    name: 'new patch',
    description: "new patch description"
  }

  describe('failing auth tests', function(){
    it('returns unauthenticated on get request to /api/patch', function(done){
      chai.request(app)
        .get('/api/patch')
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response).to.not.have.status(200);
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.have.property('error');
          expect(response.body.errors.error).to.have.property('message');
          expect(response.body.errors.error.message).to.equal('No authorization token was found');
          done()
        });
    });

    it('returns unauthenticated on post request to /api/patch', function(done){
      chai.request(app)
        .post('/api/patch')
        .send(patchBody)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response).to.not.have.status(200);
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.have.property('error');
          expect(response.body.errors.error).to.have.property('message');
          expect(response.body.errors.error.message).to.equal('No authorization token was found');
          done()
        });
    });

    it('returns unauthenticated on patch request to /api/patch', function(done){
      chai.request(app)
        .patch('/api/patch/3')
        .send(patchBody)
        .end((error, response) => {
          expect(response).to.have.status(401);
          expect(response).to.not.have.status(200);
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.have.property('error');
          expect(response.body.errors.error).to.have.property('message');
          expect(response.body.errors.error.message).to.equal('No authorization token was found');
          done()
        })
    })
  })

  describe('Protected routes access', function(){
    let token;
    const user = {
      username: "Jabinco",
      password : "jabinco"
    }
    beforeEach(function(done){
      chai.request(app)
        .post('/api/login/')
        .send(user)
        .end((error, response) => {
          if(error) done(error)
          token = response.body.token;
          done()
        });
    });

    it('should access protected get api/patch route', function(done){
      chai.request(app)
        .get('/api/patch')
        .set('Authorization', 'Bearer ' + token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(3)
          done()
        });
    });

    it('should make protected post request', function(done){
      chai.request(app)
        .post('/api/patch')
        .send(patchBody)
        .set('Authorization', 'Bearer ' + token)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(4);
          expect(response.body[3].name).to.equal(patchBody.name)
          expect(response.body[3].description).to.equal(patchBody.description)
          done()
        });
    });

    it('should make protected patch request', function(done){
      chai.request(app)
        .patch('/api/patch/2')
        .send(patchBody)
        .set('Authorization', 'Bearer ' + token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.name).to.equal(patchBody.name)
          expect(response.body.description).to.equal(patchBody.description)
          done()
        });
    });
  })
})