import { LoginController } from '../controllers';
import { LoginService } from '../services';

const loginControllerFactory = () => {
  const loginService = new LoginService();
  const loginController = new LoginController(loginService);
  return loginController;
};

export default loginControllerFactory;
