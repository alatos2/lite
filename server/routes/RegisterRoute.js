import express from 'express';
import signup from '../controllers/RegisterController';
import authentication from '../middlewares/verifications';

const registerRoute = express.Router();

registerRoute.post('/auth/signup', signup);

export default registerRoute;
