const request = require('supertest');
const express = require('express');
const userController = require('../controllers/userController');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.post('/signup', userController.signUp);
app.post('/login', userController.logIn);
app.get('/user', userController.getUser);
app.post('/add-to-wishlist', userController.addToWishlist);
app.get('/get-wishlist', userController.getWishlist);
app.post('/remove-wishlist', userController.removeFromWishlist);

describe('User Controller', () => {
  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'test1_doe',
          password: 'testingpass123',
          email: 'test1doe@example.com',
          phoneNo: '5344673555',
          address: '888 Test12 St',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('success');
      expect(res.body.data.username).toEqual('test1_doe');
    });

    it('should return a 400 error if the user could not be created', async () => {
      // Assuming that password is a required field and will cause an error if missing
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'john_doe2',
          email: 'john.doe2',
          phoneNo: '1234567890',
          address: '123 Main St',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.status).toEqual('fail');
      expect(res.body.message).toEqual('User not created');
    });

    it('should return a 500 error if the user already exists', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          username: 'john_doe',
          password: 'password123',
          email: 'john.doe@example.com',
          phoneNo: '1234567890',
          address: '123 Main St',
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body.status).toEqual('fail');
      expect(res.body.message).toEqual('User already exists');
    });
  });

  // ... other tests for logIn, getUser, etc.
});
