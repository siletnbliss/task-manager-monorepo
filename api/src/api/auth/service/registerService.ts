import { ServiceResponse } from "@/common/models/serviceResponse";
import { RegisterUserDto } from "../models/loginDto";
import userRepo from "../persistence/userRepo";
import { hashPassword } from "../utils/hash";

class RegisterService {
  private userRepo = userRepo;

  async registerUser(dto: RegisterUserDto) {
    const existsUserName = await this.userRepo.findByUsername(dto.username);
    if (!!existsUserName) {
      return ServiceResponse.failure("Username is already in use", null, 403);
    }
    const createdUser = await this.userRepo.createUser({
      ...dto,
      password: await hashPassword(dto.password),
    });
    return ServiceResponse.success("User registered", createdUser);
  }
}

const registerService = new RegisterService();
export default registerService;
