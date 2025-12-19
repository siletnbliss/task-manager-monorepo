import AppDataSource from "@/common/persistence/appDataSource";
import { UserEntity } from "@/common/persistence/entities/user";
import { RegisterUserDto } from "../models/loginDto";

class UserRepo {
  private model = AppDataSource.getRepository(UserEntity);

  async findByUsername(username: string) {
    return await this.model.findOne({ where: { username: username } });
  }

  async createUser(dto: RegisterUserDto) {
    const { password, ...rest } = await this.model.save(dto);
    return rest;
  }
}

const userRepo = new UserRepo();

export default userRepo;
