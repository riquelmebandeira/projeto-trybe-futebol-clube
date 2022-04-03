import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';

class LoginService {
  readonly userModel = User;

  async login(email: string, password: string): Promise<User | null> {
    const result = await this.userModel.findOne({ raw: true, where: { email } });

    let match;

    if (result?.password) {
      match = await bcrypt.compare(password, result.password);
    }

    if (!match) return null;

    return result as User | null;
  }
}

export default LoginService;
