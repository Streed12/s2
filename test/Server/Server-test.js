import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import app from '../../server/app';
import supertest from 'supertest';

const testAgent = supertest(app);

describe('Server Get Requests', function() 
  it("Responds with 'Hello, World!'", function(done) {
    supertest
        .get("/")
        .expect(200)
        .expect("Hello, World!")
        .end(done);
  });
});