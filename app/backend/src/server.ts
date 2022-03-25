import { App } from './app';
import 'dotenv/config';
import Routes from './routes';

const PORT = process.env.PORT || 3001;

new App(Routes).start(PORT);
