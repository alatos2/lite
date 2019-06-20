import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoute from './routes/RegisterRoute';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! Hey');
});

// app.post('/auth/signup/api/v1', AuthController.signUp);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', registerRoute);

dotenv.config();

const debug = Debug('http');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  debug(`Server running on port ${PORT}`);
});

// export default server;
