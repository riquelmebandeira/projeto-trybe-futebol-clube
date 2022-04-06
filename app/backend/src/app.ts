import * as express from 'express';
import { IRoute } from './interfaces';
import Routes from './routes';

class App {
  public app: express.Express;
  // ...

  constructor(routes: IRoute[]) {
    this.app = express();
    this.config(routes);
    // ...
  }

  private config(routes: IRoute[]):void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    routes.forEach(({ resource, router }) => this.app.use(resource, router));
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App(Routes);
