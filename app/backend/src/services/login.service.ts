import User from '../database/models/User';

class LoginService {
  readonly userModel = User;

  async login(email: string, password: string): Promise<User | null> {
    const result = await this.userModel.findOne({ raw: true, where: { email } });

    if (result?.password !== password) return null;

    return result as User | null;
  }
}

export default LoginService;
