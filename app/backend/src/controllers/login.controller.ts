import LoginService from '../services';
import User from '../database/models/User';

class LoginController {
  constructor(readonly loginService: LoginService) {}

  async login(email: string): Promise<User> {
    const result = await this.loginService.login(email);

    return result;
  }
}

export default LoginController;
