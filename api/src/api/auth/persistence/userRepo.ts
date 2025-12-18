import AppDataSource from "@/common/persistence/appDataSource";
import { UserEntity } from "@/common/persistence/entities/user";

class UserRepo {
  private model = AppDataSource.getRepository(UserEntity);

  async findByUsername(username: string) {
    return await this.model.findOne({ where: { username: username } });
  }
}

const userRepo = new UserRepo();

export default userRepo;
