import { env } from "@/common/utils/envConfig";
import userRepo from "../persistence/userRepo";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/tokens";

class LoginService {
  private userRepo = userRepo;

  async loginUser(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      return null;
    }
    const passwordMatch = comparePassword(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      access_token: generateToken(
        user,
        env.ACCESS_TOKEN_SECRET,
        env.ACCESS_TOKEN_EXPIRY
      ),
    };
  }
}

const loginService = new LoginService();
export default loginService;
