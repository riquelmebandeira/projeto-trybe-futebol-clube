import User from '../database/models/User';

class LoginService {
  readonly userModel = User;

  async login(email: string): Promise<User> {
    const result = await this.userModel.findOne({ where: { email } });

    return result as User;
  }
}

export default LoginService;
