import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

export default app;
