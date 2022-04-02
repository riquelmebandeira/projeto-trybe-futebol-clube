import LoginService from '../services';
import User from '../database/models/User';

class LoginController {
  constructor(readonly loginService: LoginService) {}

  async login(email: string, _password: string): Promise<User | null> {
    const result = await this.loginService.login(email, _password);

    return result;
  }
}

export default LoginController;
