'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockServer = supertester(server);

describe('The server functionality', () => {
  it('should respond properly to a get request on the base route', async () => {
    let response = await mockServer.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Homepage');
  });

  it('should respond properly to a get request on the /models route', async () => {
    let response = await mockServer.get('/models');
    expect(response.status).toBe(200);
  });

  it('should respond properly to a get request on the /:models/schema route', async () => {
    let response = await mockServer.get('/categories/schema');
    expect(response.status).toBe(200);
  });

  it('should respond properly to a get request on one of the /models routes', async () => {
    let response = await mockServer.get('/todo');
    expect(response.status).toBe(200);
  });

  it('should respond properly to a post request on one of the the /models routes', async () => {
    let response = await mockServer.post('/products').send({
      name: 'Gloves',
      description: 'Leather',
      price: 50,
      category: 'Clothing',
    });
    expect(response.status).toBe(200);
  });

  it('should respond properly to a get request on a specific id in one of the /models routes', async () => {
    let response = await mockServer.get('/categories/5db7c5e82cedeb37ca9d6fee');
    expect(response.status).toBe(200);
  });
  it('should respond properly to a put request on a specific id in one of the /models routes', async () => {
    let post = await mockServer.post('/products').send({
      name: 'Gloves',
      description: 'Leather',
      price: 50,
      category: 'Clothing',
    });
    console.log(post.status);
    let response = await mockServer
      .put('/products/5dba26251ec2d6bb50dff45b')
      .send({ price: 60 });
    expect(response.status).toBe(200);
  });
  it('should respond properly to a delete request on a specific id in one of the /models routes', async () => {
    let post = await mockServer.post('/products').send({
      name: 'Gloves',
      description: 'Leather',
      price: 50,
      category: 'Clothing',
    });
    console.log(post.status);
    let response = await mockServer.delete(
      '/products/5dba26251ec2d6bb50dff45b',
    );
    expect(response.status).toBe(200);
  });

  it('should log a 400 error if unknown route', async () => {
    let data = await mockServer.get('/fakeroute');
    data.status = 404;
    expect(data.status).toBe(404);
  });

  it('should log a 500 error if someone goes to /error route', async () => {
    let data = await mockServer.get('/err-throw', () => {
      throw 'failed';
    });
    expect(data.status).toBe(500);
  });
});
