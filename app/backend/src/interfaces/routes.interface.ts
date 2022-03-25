import { Router } from 'express';

interface IRoute {
  resource: string,
  router: Router
}

export default IRoute;
