import loginRouter from './login.router';
import clubsRouter from './clubs.router';
import matchsRouter from './matchs.router';

export default [
  {
    resource: '/login',
    router: loginRouter,
  },
  {
    resource: '/clubs',
    router: clubsRouter,
  },
  {
    resource: '/matchs',
    router: matchsRouter,
  },
];
