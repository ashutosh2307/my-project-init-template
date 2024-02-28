import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Container from 'typedi';
import { useContainer } from 'routing-controllers';
import config from '@config';
import useRouter from './router';

const app = express();

const corsOptions = {
  origin: config.CORS_ORIGIN,
  maxAge: config.CORS_MAXAGE
};

app.use(cors(corsOptions));
app.use(helmet());

// Initialise the dependency injection system.
useContainer(Container);

// Healthcheck.
app.get('/health', (req, res) => res.status(200).send('ok'));

// Initialise all the routes here.
useRouter(app);

export default app;
