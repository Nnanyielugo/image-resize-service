import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';

chai.use(chaiHttp);

describe('Upload routes test', function(){
  const requestBody = {
    imageSrc: "https://cdn.pixabay.com/photo/2015/06/16/16/46/meadow-811339_960_720.jpg"
  }

  const invalidFormat = {
    imageSrc: "https://cdn.pixabay.com/photo/2015/06/16/16/46/meadow-811339_960_720.woff"
  }
  describe('failing auth tests', function(){
    it('returns unauthenticated for unauthenticated upload requests', function(done){
      chai.request(app)
        .post('/api/upload')
        .send(requestBody)
        .end((error, response) =>{
          if(error) done(error);
          expect(response).to.have.status(401);
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.have.property('error');
          expect(response.body.errors.error).to.have.property('message');
          expect(response.body.errors.error.message).to.equal("No authorization token was found");
          done()
        });
    });
  });

  describe('Auth success', function(){
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

    it('authenticates, and processes image', function(done){
      chai.request(app)
        .post('/api/upload')
        .send(requestBody)
        .set('Authorization', 'Bearer ' + token)
        .end((error, response) => {
          if(error) done(error)
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.be.a('string');
          expect(response.body).to.have.property('imageUrl');
          expect(response.body.imageUrl).to.be.a('string');
          expect(response.body).to.have.property('info');
          expect(response.body.info).to.be.an('object');
          expect(response.body.info.width).to.equal(50);
          expect(response.body.info.height).to.equal(50);
          done()
        });
    });

    it('throws error on invalid image format', function(done){
      chai.request(app)
        .post('/api/upload')
        .send(invalidFormat)
        .set('Authorization', 'Bearer ' + token)
        .end((error, response) => {
          if(error) done(error)
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.have.property('message');
          expect(response.body.errors.message).to.equal("Input buffer contains unsupported image format");
          done()
        });
    });
  });
})

