import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env;

const authentication = (request, response, next) => {
  try {
    const header = request.headers.authorization;
    if (!header || header === '') return response.status(401).json({ status: 401, error: 'Authentication failed' });

    const token = jwt.verify(header, SECRET);
    request.decode = token;
    next();
  } catch (e) {
    return response.status(401).json({ status: 401, error: 'Invalid token!' });
  }
};

export default authentication;
