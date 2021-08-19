import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from "supertest";

 declare global {
      var signin: () => Promise<string[]>;
    }


let mongo: any;
beforeAll(async () => {

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});


global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(201)
  return  response.get('Set-Cookie')


}