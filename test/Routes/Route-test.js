import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';
import app from '../../server/app';
import supertest from 'supertest'

const testAgent = supertest(app)
describe('Server Routing', function() {
  it('Should respond with a 200 status', function(done) {
    testAgent
    .get("/")
    .expect(200)
    .end(done);
  });
  it('Should respond with a hash value', function(done) {
    testAgent
    .get('/api/generateID')
    .expect(200)
    .expect(res => {
      console.log(res.text);
      assert(typeof res.text === 'string', 'res body has data')
    })
    .end(done)
  })
  it('Should respond with a hash value', function(done) {
    testAgent
    .get('/api/videoURL/1511')
    .expect(404)
    .expect(res => {
      console.log(res.text);
      assert(res.text === 'Invalid ID', 'Error, id not in system')
    })
    .end(done)
  })
  it('Should respond with a hash value', function(done) {
    let videoHash;
    testAgent
      .get('/api/generateID')
      .expect(200)
      .then(res => {
        videoHash = res.text;
      })
      .end(done)
  })
});