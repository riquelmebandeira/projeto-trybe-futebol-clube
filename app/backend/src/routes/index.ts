import loginRouter from './login.router';
import clubsRouter from './clubs.router';

export default [
  {
    resource: '/login',
    router: loginRouter,
  },
  {
    resource: 'clubs',
    router: clubsRouter,
  },
];
